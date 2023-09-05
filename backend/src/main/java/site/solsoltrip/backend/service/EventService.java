package site.solsoltrip.backend.service;

import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.EventRequestDto;
import site.solsoltrip.backend.entity.Event;
import site.solsoltrip.backend.repository.EventRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventRepository eventRepository;

    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://dapi.kakao.com/v2/local/geo/coord2regioncode.json");
    }

    @Transactional
    public void registEvent(final EventRequestDto.registEvent requestDto) {
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
