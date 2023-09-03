package site.solsoltrip.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import site.solsoltrip.backend.dto.TripRequestDto;

import java.nio.charset.Charset;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TripService {
    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://shbhack.shinhan.com");
    }

    @Transactional
    public void sendRequest(final Long memberSeq, final String uri) {
        final DataHeader dataHeader = new DataHeader();

        final DataBody dataBody = DataBody.builder()
                .실명번호(String.valueOf(memberSeq))
                .build();

        final ShbhackRequestDto requestDto = ShbhackRequestDto.builder()
                .dataHeader(dataHeader)
                .dataBody(dataBody)
                .build();

        final Mono<String> responseMono = webClient.post()
                .uri(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .acceptCharset(Charset.forName("UTF-8"))
                .bodyValue(requestDto)
                .retrieve()
                .bodyToMono(String.class);

        responseMono.subscribe(
                response -> {
                    System.out.println("response = " + response);
                },
                error -> {
                    System.out.println("error = " + error);
                }
        );
    }

    @Transactional
    public void validation(final TripRequestDto.validation requestDto) {
        sendRequest(requestDto.memberSeq(), "/v1/account");
    }

    @Builder
    @Getter
    static class ShbhackRequestDto {
        private DataHeader dataHeader;

        private DataBody dataBody;
    }

    @Getter
    static class DataHeader {
        private final String apikey = "2023_Shinhan_SSAFY_Hackathon";
    }

    @Builder
    @Getter
    static class DataBody {
        private String 실명번호;
    }
}