package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.SettlementRequestDto;
import site.solsoltrip.backend.dto.SettlementResponseDto;
import site.solsoltrip.backend.entity.Accompany;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;
import site.solsoltrip.backend.entity.Category;
import site.solsoltrip.backend.repository.AccompanyMemberDepositRepository;
import site.solsoltrip.backend.repository.AccompanyMemberWithdrawRepository;
import site.solsoltrip.backend.repository.AccompanyRepository;
import site.solsoltrip.backend.repository.MemberAccompanyRepository;
import site.solsoltrip.backend.util.NumberFormatUtility;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SettlementService {
    private final AccompanyRepository accompanyRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;

    @Transactional
    public void resetEndTime(final SettlementRequestDto.resetEndTime requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(requestDto.endDate());
    }

    @Transactional
    public void endTrip(final SettlementRequestDto.endTrip requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(LocalDate.now());
    }

    @Transactional
    public SettlementResponseDto.showTripResult showTripResult(final SettlementRequestDto.showTripResult requestDto) {
        // 총 지출 금액
        final List<AccompanyMemberWithdraw> totalAccompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository.findByAccompanySeq(requestDto.accompanySeq());

        int checkedTotalCost = 0;

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : totalAccompanyMemberWithdrawList) {
            checkedTotalCost += accompanyMemberWithdraw.getCost();
        }

        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final int savedTotalCost = accompany.getTotalWithdraw();

        if (checkedTotalCost != savedTotalCost) {
            accompany.updateTotalWithdraw(checkedTotalCost);
        }

        // 날짜별 지출 금액
        final List<SettlementResponseDto.ShowTripResultDailyVO> dailyVOList = new ArrayList<>();

        LocalDate startDate = accompany.getStartDate();

        final LocalDate endDate = accompany.getEndDate();

        while (startDate.isBefore(endDate) || startDate.isEqual(endDate)) {
            final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                    accompanyMemberWithdrawRepository.findByAccompanySeqAndAcceptedDate(requestDto.accompanySeq(), startDate);

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
            final int categorySeq = Integer.parseInt(category.getNumber());

            final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                    accompanyMemberWithdrawRepository.findByAccompanySeqAndCategory(requestDto.accompanySeq(), categorySeq);

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

        return SettlementResponseDto.showTripResult.builder()
                .totalCost(checkedTotalCost)
                .dailyVOList(dailyVOList)
                .categoryVOList(categoryVOList)
                .build();
    }
}
