package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class SettlementResponseDto {
    @Builder
    public record showTripResult(
            Integer totalCost,
            List<ShowTripResultCategoryVO> categoryVOList,
            List<ShowTripResultDailyVO> dailyVOList) {}

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
}
