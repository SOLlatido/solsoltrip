package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class TripRequestDto {
    public record validation (
            @NotNull
            Long memberSeq
    ) {}

    public record registAccount (
            @NotNull
            Long memberSeq,

            @NotBlank
            String name,

            @NotBlank
            String account,

            @NotNull
            LocalDateTime startDateTime,

            @NotNull
            @FutureOrPresent
            LocalDateTime endDateTime,

            @NotNull
            int availableAmount,

            @NotBlank
            String getMethod
    ) {}
}