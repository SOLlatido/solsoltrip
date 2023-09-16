package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class InformationResponseDto {
    @Builder
    public record analysis(Integer totalCost,
                           Double myCost,
                           Integer expenseGoal,
                           List<AnalysisCategoryVO> categoryVO,
                           List<AnalysisIndividualVO> individualVO) {}

    @Getter
    @Builder
    public static class AnalysisCategoryVO {
        private final String category;
        private final Double cost;
    }

    @Getter
    @Builder
    public static class AnalysisIndividualVO {
        private final String name;
        private final Double cost;
    }
}
