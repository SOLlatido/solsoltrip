package site.solsoltrip.backend.dto;

import lombok.Builder;
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
}