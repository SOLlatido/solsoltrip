package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class TripRequestDto {
    public record validation (
            @NotNull
            Long memberSeq
    ) {}

    public record registAccount (
            @NotNull
            Long memberSeq,

            @NotNull
            Long registerAccountSeq,

            @NotBlank
            String name,

            @NotNull
            LocalDate startDate,

            @NotNull
            @FutureOrPresent
            LocalDate endDate,

            @NotBlank
            Integer personalAmount
    ) {}

    public record tripDetail (
            @NotNull
            Long accompanySeq
    ) {}
}