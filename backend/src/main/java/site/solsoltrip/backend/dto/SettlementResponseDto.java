package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class SettlementResponseDto {
    @Builder
    public record showTripResult(
            Boolean isChecked,
            Integer totalCost,
            String formattedTotalCost,
            List<ShowTripResultCategoryVO> categoryVOList,
            List<ShowTripResultDailyVO> dailyVOList) {}

    @Builder
    public record settleUp(Integer left,
                           String formattedLeft,
                           List<SettlementResponseVO> settlementList) {}

    @Getter
    public static class ShowTripResultCategoryVO {
        private final Integer category;
        private final Integer cost;
        private final String formattedCost;

        @Builder
        ShowTripResultCategoryVO(final Integer category, final Integer cost, final String formattedCost) {
            this.category = category;
            this.cost =  cost;
            this.formattedCost = formattedCost;
        }
    }

    @Getter
    public static class ShowTripResultDailyVO {
        private final LocalDate acceptedDate;
        private final Integer cost;
        private final String formattedCost;

        @Builder
        ShowTripResultDailyVO(final LocalDate acceptedDate, final Integer cost, final String formattedCost) {
            this.acceptedDate = acceptedDate;
            this.cost =  cost;
            this.formattedCost = formattedCost;
        }
    }

    @Getter
    public static class SettlementResponseVO {
        private final String name;
        private final Boolean isManager;
        private final Boolean isPositive;
        private final Integer settlement;
        private final String formattedSettlement;
        private final Integer individualWithdraw;
        private final String formattedIndividualWithdraw;
        private final Integer individualDeposit;
        private final String formattedIndividualDeposit;

        @Builder
        SettlementResponseVO(final String name,
                             final Boolean isManager,
                             final Boolean isPositive,
                             final Integer settlement,
                             final String formattedSettlement,
                             final Integer individualWithdraw,
                             final String formattedIndividualWithdraw,
                             final Integer individualDeposit,
                             final String formattedIndividualDeposit) {
            this.name = name;
            this.isManager = isManager;
            this.isPositive = isPositive;
            this.settlement = settlement;
            this.formattedSettlement = formattedSettlement;
            this.individualWithdraw = individualWithdraw;
            this.formattedIndividualWithdraw = formattedIndividualWithdraw;
            this.individualDeposit = individualDeposit;
            this.formattedIndividualDeposit = formattedIndividualDeposit;
        }
    }
}
