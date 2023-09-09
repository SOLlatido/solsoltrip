package site.solsoltrip.backend.service;

import com.google.gson.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.ShbhackRequestDto;
import site.solsoltrip.backend.dto.ShbhackResponseDto;
import site.solsoltrip.backend.dto.TripRequestDto;
import site.solsoltrip.backend.entity.RegistedAccount;
import site.solsoltrip.backend.repository.MemberRepository;
import site.solsoltrip.backend.repository.RegistedAccountRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TripService {
    private final RegistedAccountRepository registedAccountRepository;
    private final MemberRepository memberRepository;

    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://shbhack.shinhan.com");
    }

    @Transactional
    public void validation(final TripRequestDto.validation requestDto) {
        if (registedAccountRepository.findByMemberSeqJoinFetchMember(requestDto.memberSeq()).isEmpty()) {
            final String bankListObject = sendRequest(requestDto.memberSeq(), "/v1/account");

            final ShbhackResponseDto responseDto = stringToShbhackResponseDto(bankListObject);

            for (ShbhackResponseDto.DataBody.DepositAndSavings data : responseDto.getDataBody().get조회내역1()) {
                RegistedAccount account = RegistedAccount.builder()
                        .type(data.get구분())
                        .account(data.get계좌번호())
                        .name(data.get상품명())
                        .balance(Integer.parseInt(data.get잔액()))
                        .member(memberRepository.findByMemberSeq(requestDto.memberSeq()).get())
                        .build();

                registedAccountRepository.save(account);
            }
        }

        // Todo : 동행통장으로 계좌를 사용할 수 있는지 여부에 대한 로직
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

    @Transactional
    public ShbhackResponseDto stringToShbhackResponseDto(String jsonObject) {
        JsonElement element = JsonParser.parseString(jsonObject);

        JsonObject object = element.getAsJsonObject();

        JsonObject dataHeader = object.get("dataHeader").getAsJsonObject();
        JsonObject dataBody = object.get("dataBody").getAsJsonObject();

        JsonArray checkHistory = dataBody.get("조회내역1").getAsJsonArray();

        List<ShbhackResponseDto.DataBody.DepositAndSavings> 조회내역 = new ArrayList<>();

        int bankDataNum = Integer.parseInt(dataBody.get("반복횟수1").getAsString());

        for (int i = 0; i < bankDataNum; i++) {
            조회내역.add(ShbhackResponseDto.DataBody.DepositAndSavings.builder()
                    .구분(checkHistory.get(i).getAsJsonObject().get("구분").getAsString())
                    .계좌번호(checkHistory.get(i).getAsJsonObject().get("계좌번호").getAsString())
                    .상품명(checkHistory.get(i).getAsJsonObject().get("상품명").getAsString())
                    .잔액(checkHistory.get(i).getAsJsonObject().get("잔액(원화)").getAsString())
                    .build());
        }

        ShbhackResponseDto responseDto = ShbhackResponseDto.builder()
                .dataHeader(ShbhackResponseDto.DataHeader.builder()
                        .successCode(dataHeader.get("successCode").getAsString())
                        .resultCode(dataHeader.get("resultCode").getAsString())
                        .resultMessage(dataHeader.get("resultMessage").getAsString())
                        .build())
                .dataBody(ShbhackResponseDto.DataBody.builder()
                        .고객명(dataBody.get("고객명").getAsString())
                        .반복횟수(dataBody.get("반복횟수1").getAsString())
                        .조회내역1(조회내역)
                        .build())
                .build();

        return responseDto;
    }
}