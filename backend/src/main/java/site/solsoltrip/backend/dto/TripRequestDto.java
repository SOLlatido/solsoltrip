package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class TripRequestDto {
    public record validation (
            @NotBlank
            Long memberSeq
    ) {}

    public record registAccount (
            @NotBlank
            Long memberSeq,

            @NotBlank
            String name,

            @NotBlank
            String account,

            @NotBlank
            LocalDateTime startDateTime,

            @NotBlank
            LocalDateTime endDateTime,

            @NotBlank
            int avaliableAmount,

            @NotBlank
            String getMethod
    ) {}
}