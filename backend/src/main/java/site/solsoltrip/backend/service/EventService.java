package site.solsoltrip.backend.service;

import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.EventRequestDto;
import site.solsoltrip.backend.dto.EventResponseDto;
import site.solsoltrip.backend.entity.Event;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.MemberEvent;
import site.solsoltrip.backend.repository.EventRepository;
import site.solsoltrip.backend.repository.MemberEventRepository;
import site.solsoltrip.backend.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final MemberEventRepository memberEventRepository;

    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json");
    }

    @Transactional
    public void registEvent(final EventRequestDto.registEvent requestDto) {
        if (eventRepository.findByXAndY(requestDto.x(), requestDto.y()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이벤트 지역입니다.");
        }

        final String regionObject = sendRequest(requestDto.x(), requestDto.y());

        final Gson gson = new Gson();

        final RegionJson regionJson = gson.fromJson(regionObject, RegionJson.class);

        final String region = regionJson.getDocuments().get(0).address_name;

        final Event event = Event.builder()
                .name(requestDto.name())
                .region(region)
                .x(requestDto.x())
                .y(requestDto.y())
                .build();

        eventRepository.save(event);
    }

    public EventResponseDto.nearbyInform nearbyInform(final EventRequestDto.nearbyInform requestDto) {
        final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final List<Event> eventList = eventRepository.findByRegion(requestDto.region());

        if (eventList.isEmpty()) {
            return null;
        }

        List<EventResponseDto.EventResponseVO> responseVOList = new ArrayList<>();

        for (Event event : eventList) {
            final MemberEvent memberEvent = memberEventRepository
                    .findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(member.getMemberSeq(), event.getEventSeq())
                    .orElseGet(() -> memberEventRepository.save(MemberEvent.builder()
                                    .event(event)
                                    .member(member)
                                    .isDone(false)
                            .build())
            );

            if (memberEvent.getIsDone()) {
                continue;
            }

            double dist = coordinateToMeter(event.getX(), event.getY(), requestDto.x(), requestDto.y());

            if (dist > 500) {
                continue;
            }

            short plane = 0;
            double ratio = 0;

            if (event.getY() - requestDto.y() > 0 && event.getX() - requestDto.x() > 0) {
                plane = 1;
            } else if (event.getY() - requestDto.y() > 0 && event.getX() - requestDto.x() < 0) {
                plane = 2;
            } else if (event.getY() - requestDto.y() < 0 && event.getX() - requestDto.x() < 0) {
                plane = 3;
            } else if (event.getY() - requestDto.y() < 0 && event.getX() - requestDto.x() > 0) {
                plane = 4;
            } else if (event.getY() - requestDto.y() == 0) {
                ratio = 1;
            } else {
                ratio = 0;
            }

            if (event.getX() - requestDto.x() != 0 || event.getY() - requestDto.y() != 0) {
                ratio = Math.abs(event.getX() - requestDto.x()) / Math.abs(event.getY() - requestDto.y());
            }

            EventResponseDto.EventResponseVO responseVO = EventResponseDto.EventResponseVO.builder()
                    .name(event.getName())
                    .plane(plane)
                    .ratio(ratio)
                    .build();

            responseVOList.add(responseVO);
        }

        return EventResponseDto.nearbyInform.builder()
                .responseVOList(responseVOList)
                .build();
    }

    private static double coordinateToMeter(double eventX, double eventY, double curX, double curY) {
        double theta = eventY - curY;

        double dist = Math.sin(deg2rad(eventX)) * Math.sin(deg2rad(curX)) +
                Math.cos(deg2rad(eventX)) * Math.cos(deg2rad(curX)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);

        dist = rad2deg(dist);

        return dist * 60 * 1.1515 * 1609.344;
    }

    private static double deg2rad(double deg){
        return (deg * Math.PI/180.0);
    }
    //radian(라디안)을 10진수로 변환
    private static double rad2deg(double rad){
        return (rad * 180 / Math.PI);
    }

    private String sendRequest(final double latitude, final double longitude) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("x", latitude)
                        .queryParam("y", longitude)
                        .build())
                .header("Authorization", "KakaoAK 7276680ce0f3c0be137b878203962dfa")
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Getter
    private static class RegionJson {
        private Meta meta;
        private List<Document> documents;

        @Getter
        public static class Meta {
            private int total_count;
        }

        @Getter
        public static class Document {
            private String region_type;
            private String code;
            private String address_name;
            private String region_1depth_name;
            private String region_2depth_name;
            private String region_3depth_name;
            private String region_4depth_name;
            private double x;
            private double y;
        }
    }
}
