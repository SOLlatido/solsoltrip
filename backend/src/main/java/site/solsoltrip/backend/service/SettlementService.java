package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.SettlementRequestDto;
import site.solsoltrip.backend.dto.SettlementResponseDto;
import site.solsoltrip.backend.entity.*;
import site.solsoltrip.backend.repository.*;
import site.solsoltrip.backend.util.NumberFormatUtility;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SettlementService {
    private final MemberRepository memberRepository;
    private final AccompanyRepository accompanyRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;
    private final AccompanyMemberDepositRepository accompanyMemberDepositRepository;
    private final MemberAccompanyRepository memberAccompanyRepository;
    private final IndividualWithdrawRepository individualWithdrawRepository;
    private final RegistedAccountRepository registedAccountRepository;

    public void resetEndTime(final SettlementRequestDto.resetEndTime requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(requestDto.endDate());
    }

    public void endTrip(final SettlementRequestDto.endTrip requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(LocalDate.now());

        final RegistedAccount registedAccount = registedAccountRepository
                .findByAccount(accompany.getAccount())
                .orElseThrow(() -> new IllegalArgumentException("해당하는 유저의 해당 계좌가 없습니다."));

        registedAccount.updateIsAccompanyAccount(false);
    }

    public SettlementResponseDto.showTripResult checkShowTripResult(final SettlementRequestDto.showTripResult requestDto) {
        final MemberAccompany memberAccompany =
                memberAccompanyRepository
                        .findByAccompanySeqAndMemberSeq(requestDto.accompanySeq(), requestDto.memberSeq())
                        .orElseThrow(
                                () -> new IllegalArgumentException("해당하는 통장의 유저가 존재하지 않습니다.")
                        );

        if (memberAccompany.getIsChecked()) {
            return SettlementResponseDto.showTripResult.builder()
                    .isChecked(memberAccompany.getIsChecked())
                    .build();
        } else {
            return showTripResult(requestDto.accompanySeq(), requestDto.memberSeq());
        }
    }

    public SettlementResponseDto.timeline timeline(final SettlementRequestDto.timeline requestDto) {
        final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<SettlementResponseDto.TimelineVO> timelineVOList = new ArrayList<>();

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
            final SettlementResponseDto.TimelineVO timelineVO = SettlementResponseDto.TimelineVO.builder()
                    .store(accompanyMemberWithdraw.getStore())
                    .cost(accompanyMemberWithdraw.getCost())
                    .memo(accompanyMemberWithdraw.getMemo())
                    .picture(accompanyMemberWithdraw.getPicture())
                    .acceptedDate(accompanyMemberWithdraw.getAcceptedDate())
                    .acceptedDateTime(accompanyMemberWithdraw.getAcceptedDateTime())
                    .build();

            timelineVOList.add(timelineVO);
        }

        return SettlementResponseDto.timeline.builder()
                .timeline(timelineVOList)
                .build();
    }

    public SettlementResponseDto.settleUp settleUp(final SettlementRequestDto.settleUp requestDto) {
        final List<MemberAccompany> memberAccompanyList =
                memberAccompanyRepository.findByAccompanySeq(requestDto.accompanySeq());

        SettlementResponseDto.settleUp responseDto = null;

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member member = memberAccompany.getMember();

            if (member.getMemberSeq().equals(requestDto.memberSeq())) {
                if (memberAccompany.getIsManager()) {
                    responseDto = settleUpForManager(requestDto.accompanySeq());
                } else {
                    responseDto = settleUpForAccompany(requestDto.accompanySeq(), requestDto.memberSeq());
                }
            }
        }

        return responseDto;
    }

    private SettlementResponseDto.showTripResult showTripResult(final Long accompanySeq, final Long memberSeq) {
        // 총 입금액
        final List<AccompanyMemberDeposit> totalAccompanyMemberDepositList =
                accompanyMemberDepositRepository.findByAccompanySeq(accompanySeq);

        int checkedTotalDeposit = 0;

        for (final AccompanyMemberDeposit accompanyMemberDeposit : totalAccompanyMemberDepositList) {
            checkedTotalDeposit += accompanyMemberDeposit.getCost();
        }

        final Accompany accompany = accompanyRepository.findByAccompanySeq(accompanySeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final int savedTotalDeposit = accompany.getTotalDeposit();

        if (checkedTotalDeposit != savedTotalDeposit) {
            accompany.updateTotalDeposit(checkedTotalDeposit);
        }

        // 총 출금액
        final List<AccompanyMemberWithdraw> totalAccompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository.findByAccompanySeq(accompanySeq);

        int checkedTotalWithdraw = 0;

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : totalAccompanyMemberWithdrawList) {
            checkedTotalWithdraw += accompanyMemberWithdraw.getCost();
        }

        final int savedTotalWithdraw = accompany.getTotalWithdraw();

        if (checkedTotalWithdraw != savedTotalWithdraw) {
            accompany.updateTotalWithdraw(checkedTotalWithdraw);
        }

        // 날짜별 지출 금액
        final List<SettlementResponseDto.ShowTripResultDailyVO> dailyVOList = new ArrayList<>();

        LocalDate startDate = accompany.getStartDate();

        final LocalDate endDate = accompany.getEndDate();

        while (startDate.isBefore(endDate) || startDate.isEqual(endDate)) {
            final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                    accompanyMemberWithdrawRepository
                            .findByAccompanySeqAndAcceptedDate(accompanySeq, startDate);

            int dailyCost = 0;

            for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
                dailyCost += accompanyMemberWithdraw.getCost();
            }

            final SettlementResponseDto.ShowTripResultDailyVO dailyVO =
                    SettlementResponseDto.ShowTripResultDailyVO.builder()
                            .acceptedDate(startDate)
                            .cost(dailyCost)
                            .formattedCost(NumberFormatUtility.formatter(dailyCost))
                            .build();

            dailyVOList.add(dailyVO);

            startDate = startDate.plusDays(1);
        }

        // 카테고리별 지출 금액
        final List<SettlementResponseDto.ShowTripResultCategoryVO> categoryVOList = new ArrayList<>();

        for (final Category category : Category.values()) {
            final String categorySeq = category.getNumber();

            final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                    accompanyMemberWithdrawRepository
                            .findByAccompanySeqAndCategory(accompanySeq, categorySeq);

            if (accompanyMemberWithdrawList.isEmpty()) {
                continue;
            }

            int categoryCost = 0;

            for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
                categoryCost += accompanyMemberWithdraw.getCost();
            }

            final SettlementResponseDto.ShowTripResultCategoryVO categoryVO =
                    SettlementResponseDto.ShowTripResultCategoryVO.builder()
                            .category(categorySeq)
                            .cost(categoryCost)
                            .formattedCost(NumberFormatUtility.formatter(categoryCost))
                            .build();

            categoryVOList.add(categoryVO);
        }

        final MemberAccompany memberAccompany =
                memberAccompanyRepository
                        .findByAccompanySeqAndMemberSeq(accompanySeq, memberSeq)
                        .orElseThrow(
                                () -> new IllegalArgumentException("해당하는 통장의 유저가 존재하지 않습니다.")
                        );

        memberAccompany.updateIsChecked(true);

        return SettlementResponseDto.showTripResult.builder()
                .isChecked(memberAccompany.getIsChecked())
                .totalCost(checkedTotalWithdraw)
                .formattedTotalCost(NumberFormatUtility.formatter(checkedTotalWithdraw))
                .dailyVOList(dailyVOList)
                .categoryVOList(categoryVOList)
                .build();
    }

    private SettlementResponseDto.settleUp settleUpForManager(final Long accompanySeq) {
        // 1. 각자 사용한 금액에 대한 정산
        final List<MemberAccompany> memberAccompanyList =
                memberAccompanyRepository.findByAccompanySeq(accompanySeq);

        final List<String> eachActualUsageUuid = new ArrayList<>();

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member member = memberAccompany.getMember();

            eachActualUsageUuid.add(member.getUuid());
        }

        final double[] eachActualUsage = new double[eachActualUsageUuid.size()];

        final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository.findByAccompanySeq(accompanySeq);

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
            final List<IndividualWithdraw> individualWithdrawList = individualWithdrawRepository
                    .findByAccompanyMemberWithdrawSeq(accompanyMemberWithdraw.getAccompanyMemberWithdrawSeq());

            for (final IndividualWithdraw individualWithdraw : individualWithdrawList) {
                if (!individualWithdraw.getIsIncluded()) {
                    continue;
                }

                final Member member = individualWithdraw.getMember();

                final int memberLocation = eachActualUsageUuid.indexOf(member.getUuid());

                eachActualUsage[memberLocation] += individualWithdraw.getIndividual();
            }
        }

        // 2. 남은 금액
        final Accompany accompany = accompanyRepository.findByAccompanySeq(accompanySeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final int left = accompany.getTotalDeposit() - accompany.getTotalWithdraw();

        // 3. 실제 정산
        final List<SettlementResponseDto.SettlementResponseVO> settlementList = new ArrayList<>();

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member member = memberAccompany.getMember();

            // 개별 입금액 확인
            final List<AccompanyMemberDeposit> individualAccompanyMemberDepositList =
                    accompanyMemberDepositRepository
                            .findByAccompanySeqAndMemberSeq(accompanySeq, member.getMemberSeq());

            int checkedIndividualDeposit = 0;

            for (final AccompanyMemberDeposit accompanyMemberDeposit : individualAccompanyMemberDepositList) {
                checkedIndividualDeposit += accompanyMemberDeposit.getCost();
            }

            final int savedIndividualDeposit = memberAccompany.getIndividualDeposit();

            if (checkedIndividualDeposit != savedIndividualDeposit) {
                memberAccompany.updateIndividualDeposit(checkedIndividualDeposit);
            }

            // 개별 출금액 확인
            final int memberLocation = eachActualUsageUuid.indexOf(member.getUuid());

            final double checkedIndividualWithdraw = eachActualUsage[memberLocation];

            final int individualWithdraw = (int) Math.ceil(eachActualUsage[memberLocation]);

            final double savedIndividualWithdraw = memberAccompany.getIndividualWithdraw();

            if (checkedIndividualWithdraw != savedIndividualWithdraw) {
                memberAccompany.updateIndividualWithdraw(individualWithdraw);
            }

            // 정산 시작
            final int settlement = checkedIndividualDeposit - individualWithdraw;

            memberAccompany.updateSettlement(settlement);

            final boolean isManager = memberAccompany.getIsManager();

            final boolean isPositive = settlement >= 0;

            final SettlementResponseDto.SettlementResponseVO responseVO =
                    SettlementResponseDto.SettlementResponseVO.builder()
                            .name(member.getName())
                            .isManager(isManager)
                            .isPositive(isPositive)
                            .settlement(settlement)
                            .formattedSettlement(NumberFormatUtility.formatter(settlement))
                            .individualDeposit(checkedIndividualDeposit)
                            .formattedIndividualDeposit(NumberFormatUtility.formatter(checkedIndividualDeposit))
                            .individualWithdraw(individualWithdraw)
                            .formattedIndividualWithdraw(NumberFormatUtility.formatter(individualWithdraw))
                            .build();

            settlementList.add(responseVO);
        }

        return SettlementResponseDto.settleUp.builder()
                .left(left)
                .formattedLeft(NumberFormatUtility.formatter(left))
                .settlementList(settlementList)
                .build();
    }

    private SettlementResponseDto.settleUp settleUpForAccompany(final Long accompanySeq, final Long memberSeq) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(accompanySeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final int left = accompany.getTotalDeposit() - accompany.getTotalWithdraw();

        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final MemberAccompany memberAccompany =
                memberAccompanyRepository
                        .findByAccompanySeqAndMemberSeq(accompanySeq, memberSeq)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 통장의 유저가 존재하지 않습니다."));

        final int settlement = memberAccompany.getSettlement();

        final boolean isPositive = settlement >= 0;

        final int individualDeposit = memberAccompany.getIndividualDeposit();

        final double individualWithdraw = memberAccompany.getIndividualWithdraw();

        final int integerIndividualWithdraw = (int) Math.ceil(individualWithdraw);

        final List<SettlementResponseDto.SettlementResponseVO> settlementList = new ArrayList<>();

        final SettlementResponseDto.SettlementResponseVO responseVO =
                SettlementResponseDto.SettlementResponseVO.builder()
                        .name(member.getName())
                        .isManager(memberAccompany.getIsManager())
                        .isPositive(isPositive)
                        .settlement(settlement)
                        .formattedSettlement(NumberFormatUtility.formatter(settlement))
                        .individualDeposit(individualDeposit)
                        .formattedIndividualDeposit(NumberFormatUtility.formatter(individualDeposit))
                        .individualWithdraw(integerIndividualWithdraw)
                        .formattedSettlement(NumberFormatUtility.formatter(integerIndividualWithdraw))
                        .build();

        settlementList.add(responseVO);

        return SettlementResponseDto.settleUp.builder()
                .left(left)
                .formattedLeft(NumberFormatUtility.formatter(left))
                .settlementList(settlementList)
                .build();
    }
}
