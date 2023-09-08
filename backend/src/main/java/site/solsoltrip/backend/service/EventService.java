package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final MemberEventRepository memberEventRepository;

    @Transactional
    public void registEvent(final EventRequestDto.registEvent requestDto) {
        if (eventRepository.findByXAndY(requestDto.x(), requestDto.y()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이벤트 지역입니다.");
        }

        final Event event = Event.builder()
                .name(requestDto.name())
                .x(requestDto.x())
                .y(requestDto.y())
                .build();

        eventRepository.save(event);
    }

    @Transactional
    public EventResponseDto.nearbyOrArrivalInform nearbyOrArrivalInform(final EventRequestDto.nearbyOrArrivalInform requestDto) {
        final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final List<Event> eventList = eventRepository.findAll();

        if (eventList.isEmpty()) {
            return null;
        }

        List<EventResponseDto.EventResponseVO> responseVOList = new ArrayList<>();

        boolean isArrived = false;
        int eventPoint = 0;

        for (Event event : eventList) {
            final MemberEvent memberEvent = memberEventRepository
                    .findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(requestDto.memberSeq(), event.getEventSeq())
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

            if (dist > Event.NEARBY_UNIT) {
                continue;
            }

            if (dist < Event.ARRIVAL_UNIT) {
                eventPoint = arrivalInform(requestDto.memberSeq(), event.getEventSeq());
                isArrived = true;
                continue;
            }

            EventResponseDto.EventResponseVO responseVO = EventResponseDto.EventResponseVO.builder()
                    .name(event.getName())
                    .build();

            responseVOList.add(responseVO);
        }

        return EventResponseDto.nearbyOrArrivalInform.builder()
                .isArrived(isArrived)
                .point(eventPoint)
                .responseVOList(responseVOList)
                .build();
    }

    @Transactional
    private int arrivalInform(final Long memberSeq, final Long eventSeq) {
        final MemberEvent memberEvent = memberEventRepository
                .findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(memberSeq, eventSeq)
                .orElseThrow(() -> new IllegalArgumentException("찾은 멤버 및 이벤트와 매칭되는 정보가 없습니다."));

        memberEvent.updateIsDone(true);

        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        int myPoint = member.getPoint();

        int eventPoint = generatePoint();

        member.updatePoint(myPoint + eventPoint);

        return eventPoint;
    }

    private static double coordinateToMeter(double eventX, double eventY, double curX, double curY) {
        double theta = eventY - curY;

        double dist = Math.sin(deg2rad(eventX)) * Math.sin(deg2rad(curX)) +
                Math.cos(deg2rad(eventX)) * Math.cos(deg2rad(curX)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);

        dist = rad2deg(dist);

        return dist * Event.COORDINATE_TO_METER_UNIT;
    }

    private static double deg2rad(double deg){
        return (deg * Math.PI / 180);
    }

    private static double rad2deg(double rad){
        return (rad * 180 / Math.PI);
    }

    private static int generatePoint() {
        int point = 0;

        Random random = new Random();

        double percentage = (Math.random() * 100) + 1;

        if (0 < percentage && percentage < Event.FIRST_SECTION_PERCENTAGE) {
            point = random.nextInt(9) + 1;
        } else if (Event.FIRST_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.SECOND_SECTION_PERCENTAGE) {
            point = random.nextInt(10) + 10;
        } else if (Event.SECOND_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.THIRD_SECTION_PERCENTAGE) {
            point = random.nextInt(30) + 20;
        } else if (Event.THIRD_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.FOURTH_SECTION_PERCENTAGE) {
            point = random.nextInt(50) + 50;
        } else if (Event.FOURTH_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.FIFTH_SECTION_PERCENTAGE) {
            point = random.nextInt(901) + 100;
        }

        return point;
    }
}
