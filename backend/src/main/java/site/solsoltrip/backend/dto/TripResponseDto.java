package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;
import site.solsoltrip.backend.entity.AccompanyContent;

import java.time.LocalDate;
import java.util.List;

public class TripResponseDto {
    @Builder
    public record tripDetail(
            String account,

            String name,

            LocalDate startDate,

            LocalDate endDate,

            int availableAmount,

            int leftover,

            List<AccompanyContent> accompanyContents
    ) {}

    @Builder
    public record validation(List<TripResponseVO> responseVOList) {}

    @Getter
    @Builder
    public static class TripResponseVO {
        private final Long registedAccountseq;
        private final String account;
        private final String name;
        private final String balance;
    }
}