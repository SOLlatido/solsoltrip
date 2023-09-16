package site.solsoltrip.backend.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.ShbhackRequestDto;
import site.solsoltrip.backend.dto.ShbhackResponseDto;
import site.solsoltrip.backend.dto.TripRequestDto;
import site.solsoltrip.backend.dto.TripResponseDto;
import site.solsoltrip.backend.entity.*;
import site.solsoltrip.backend.repository.*;
import site.solsoltrip.backend.util.NumberFormatUtility;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TripService {
    private final RegistedAccountRepository registedAccountRepository;
    private final MemberRepository memberRepository;
    private final MemberAccompanyRepository memberAccompanyRepository;
    private final AccompanyRepository accompanyRepository;
    private final AccompanyMemberDepositRepository accompanyMemberDepositRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;

    private WebClient webClient;

    @PostConstruct
    public void initWebClient() {
        webClient = WebClient.create("https://shbhack.shinhan.com");
    }

    @Transactional
    public TripResponseDto.validation validation(final TripRequestDto.validation requestDto) {
        if (registedAccountRepository.findByMemberSeqJoinFetchMember(requestDto.memberSeq()).isEmpty()) {
            final String bankListObject = sendRequest(requestDto.memberSeq(), "/v1/account");

            final ShbhackResponseDto responseDto = stringToShbhackResponseDto(bankListObject);

            final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                    () -> new IllegalArgumentException("존재하지 않는 유저입니다."));

            for (ShbhackResponseDto.DataBody.DepositAndSavings data : responseDto.getDataBody().get조회내역1()) {
                RegistedAccount account = RegistedAccount.builder()
                        .type(data.get구분())
                        .account(data.get계좌번호())
                        .name(data.get상품명())
                        .balance(Integer.parseInt(data.get잔액()))
                        .member(member)
                        .build();

                registedAccountRepository.save(account);
            }
        }

        final String[] notAllowedKeyword = new String[]{"증권", "보험", "대출", "적금"};

        final List<TripResponseDto.TripResponseVO> responseVOList = new ArrayList<>();

        final List<RegistedAccount> registedAccountList = registedAccountRepository.findByMemberSeqJoinFetchMember(requestDto.memberSeq());

        for (RegistedAccount account : registedAccountList) {
            if (!StringUtils.containsAny(account.getName(), notAllowedKeyword) &&
            !account.getIsAccompanyAccount()) {
                TripResponseDto.TripResponseVO responseVO = TripResponseDto.TripResponseVO.builder()
                        .registedAccountSeq(account.getRegistedAccountSeq())
                        .account(account.getAccount())
                        .name(account.getName())
                        .balance(String.valueOf(account.getBalance()))
                        .build();

                responseVOList.add(responseVO);
            }
        }

        return TripResponseDto.validation.builder()
                .responseVOList(responseVOList)
                .build();
    }

    @Transactional
    public void registAccount(final TripRequestDto.registAccount requestDto) {
        final RegistedAccount account = registedAccountRepository
                .findByRegistedAccountSeq(requestDto.registedAccountSeq())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 계좌입니다."));

        if (account.getIsAccompanyAccount()) {
            throw new IllegalArgumentException("이미 동행 통장인 계좌입니다.");
        }

        account.updateIsAccompanyAccount(true);

        final Accompany accompany = Accompany.builder()
                .name(requestDto.name())
                .account(account.getAccount())
                .startDate(requestDto.startDate())
                .endDate(requestDto.endDate())
                .individual(requestDto.individual())
                .totalDeposit(requestDto.individual())
                .totalWithdraw(0)
                .build();

        accompanyRepository.save(accompany);

        final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        final List<Accompany> accompanyList = accompanyRepository.findByAccount(account.getAccount());

        Accompany savedAccompany = null;

        for (final Accompany now : accompanyList) {
            final RegistedAccount registedAccount = registedAccountRepository.findByAccount(now.getAccount())
                    .orElseThrow(() -> new IllegalArgumentException("해당하는 계좌의 통장이 없습니다."));

            if (!registedAccount.getIsAccompanyAccount()) {
                continue;
            }

            savedAccompany = now;
            break;
        }

        final MemberAccompany memberAccompany = MemberAccompany.builder()
                .member(member)
                .accompany(savedAccompany)
                .isManager(true)
                .isPaid(false)
                .settlement(0)
                .individualDeposit(requestDto.individual())
                .individualWithdraw(0)
                .isChecked(false)
                .build();

        memberAccompanyRepository.save(memberAccompany);

        final AccompanyMemberDeposit accompanyMemberDeposit = AccompanyMemberDeposit.builder()
                .member(member)
                .accompany(savedAccompany)
                .name(member.getName())
                .cost(requestDto.individual())
                .acceptedDate(LocalDate.now())
                .category(Category.입금.getNumber())
                .acceptedDateTime(LocalDateTime.now())
                .build();

        accompanyMemberDepositRepository.save(accompanyMemberDeposit);
    }

    @Transactional
    public TripResponseDto.tripDetail movetoTripDetail(final TripRequestDto.tripDetail requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 동행통장입니다.")
        );

        final List<AccompanyMemberDeposit> depositList = accompanyMemberDepositRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<AccompanyMemberWithdraw> withdrawList = accompanyMemberWithdrawRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<Object> totalList = new ArrayList<>();

        totalList.addAll(depositList);
        totalList.addAll(withdrawList);

        totalList.sort(Comparator.comparing(o -> {
            if (o instanceof AccompanyMemberDeposit) {
                return ((AccompanyMemberDeposit) o).getAcceptedDateTime();
            } else if (o instanceof AccompanyMemberWithdraw) {
                return ((AccompanyMemberWithdraw) o).getAcceptedDateTime();
            }

            return null;
        }));

        final int size = memberAccompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).size();

        return TripResponseDto.tripDetail.builder()
                .account(accompany.getAccount())
                .name(accompany.getName())
                .size(size)
                .startDate(accompany.getStartDate())
                .endDate(accompany.getEndDate())
                .depositList(depositList)
                .withdrawList(withdrawList)
                .totalList(totalList)
                .build();
    }

    public TripResponseDto.totalMember totalMember(final TripRequestDto.totalMember requestDto) {
        final List<MemberAccompany> memberAccompanyList =
                memberAccompanyRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<TripResponseDto.TotalMemberVO> totalMemberList = new ArrayList<>();

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member now = memberAccompany.getMember();

            final String name = now.getName();

            boolean isMe = now.getMemberSeq().equals(requestDto.memberSeq());

            final int formattedWithdraw = memberAccompany.getIndividualWithdraw();

            final TripResponseDto.TotalMemberVO totalMemberVO = TripResponseDto.TotalMemberVO.builder()
                    .name(name)
                    .isMe(isMe)
                    .formattedWithdraw(NumberFormatUtility.formatter(formattedWithdraw))
                    .build();

            totalMemberList.add(totalMemberVO);
        }

        return TripResponseDto.totalMember.builder()
                .totalMemberList(totalMemberList)
                .build();
    }

    @Transactional
    public TripResponseDto.check check(final TripRequestDto.check requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final boolean endTrip = accompany.getEndDate().isBefore(LocalDate.now());

        return TripResponseDto.check.builder()
                .endTrip(endTrip)
                .build();
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
    public ShbhackResponseDto stringToShbhackResponseDto(final String jsonObject) {
        final JsonElement element = JsonParser.parseString(jsonObject);

        final JsonObject object = element.getAsJsonObject();

        final JsonObject dataHeader = object.get("dataHeader").getAsJsonObject();
        final JsonObject dataBody = object.get("dataBody").getAsJsonObject();

        final JsonArray checkHistory = dataBody.get("조회내역1").getAsJsonArray();

        final List<ShbhackResponseDto.DataBody.DepositAndSavings> 조회내역 = new ArrayList<>();

        final int bankDataNum = Integer.parseInt(dataBody.get("반복횟수1").getAsString());

        for (int i = 0; i < bankDataNum; i++) {
            조회내역.add(ShbhackResponseDto.DataBody.DepositAndSavings.builder()
                    .구분(checkHistory.get(i).getAsJsonObject().get("구분").getAsString())
                    .계좌번호(checkHistory.get(i).getAsJsonObject().get("계좌번호").getAsString())
                    .상품명(checkHistory.get(i).getAsJsonObject().get("상품명").getAsString())
                    .잔액(checkHistory.get(i).getAsJsonObject().get("잔액(원화)").getAsString())
                    .build());
        }

        final ShbhackResponseDto responseDto = ShbhackResponseDto.builder()
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