package site.solsoltrip.backend.dto;

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

            @NotNull
            String name,

            @NotNull
            String account,

            @NotNull
            LocalDateTime startDateTime,

            @NotNull
            LocalDateTime endDateTime,

            @NotNull
            int availableAmount,

            @NotNull
            String getMethod
    ) {}
}