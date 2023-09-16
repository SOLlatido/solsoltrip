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
            Long registedAccountSeq,

            @NotBlank
            String name,

            @NotNull
            LocalDate startDate,

            @NotNull
            @FutureOrPresent
            LocalDate endDate,

            @NotNull
            Integer individual
    ) {}

    public record tripDetail (
            @NotNull
            Long accompanySeq
    ) {}

    public record check(
            @NotNull
            Long accompanySeq
    ) {}
}