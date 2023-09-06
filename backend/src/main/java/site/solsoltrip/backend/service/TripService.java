package site.solsoltrip.backend.service;

import com.google.gson.Gson;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.TripRequestDto;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TripService {
    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://shbhack.shinhan.com");
    }

    @Transactional
    public void validation(final TripRequestDto.validation requestDto) {
        final String bankListObject = sendRequest(requestDto.memberSeq(), "/v1/account");

        final Gson gson = new Gson();

        final ShbhackResponseDto responseDto = gson.fromJson(bankListObject, ShbhackResponseDto.class);
    }

    @Transactional
    public String sendRequest(final Long memberSeq, final String uri) {
        final ShbhackRequestDto requestDto = ShbhackRequestDto.builder()
                .dataHeader(new ShbhackRequestDto.DataHeader())
                .dataBody(ShbhackRequestDto.DataBody.builder()
                        .실명번호(String.valueOf(memberSeq))
                        .build())
                .build();

        return webClient.post()
                .uri(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestDto)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}