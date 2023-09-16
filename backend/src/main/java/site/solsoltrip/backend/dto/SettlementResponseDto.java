package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    public record timeline(List<TimelineVO> timeline) {}

    @Builder
    public record settleUp(Integer left,
                           String formattedLeft,
                           List<SettlementResponseVO> settlementList) {}

    @Getter
    @Builder
    public static class ShowTripResultCategoryVO {
        private final String category;
        private final Integer cost;
        private final String formattedCost;
    }

    @Getter
    @Builder
    public static class ShowTripResultDailyVO {
        private final LocalDate acceptedDate;
        private final Integer cost;
        private final String formattedCost;
    }

    @Getter
    @Builder
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
    }

    @Getter
    @Builder
    public static class TimelineVO {
        private final String store;
        private final Integer cost;
        private final String picture;
        private final String memo;
        private final LocalDate acceptedDate;
        private final LocalDateTime acceptedDateTime;
    }
}
