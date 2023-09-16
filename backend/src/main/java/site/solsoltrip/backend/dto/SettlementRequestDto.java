package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class SettlementRequestDto {
    public record resetEndTime(
            @NotNull
            Long accompanySeq,

            @FutureOrPresent
            LocalDate endDate) {}

    public record endTrip(
            @NotNull
            Long accompanySeq,

            @NotNull
            Long memberSeq) {}

    public record showTripResult(
            @NotNull
            Long accompanySeq,

            @NotNull
            Long memberSeq) {}

    public record timeline(
            @NotNull
            Long accompanySeq) {}

    public record settleUp(
            @NotNull
            Long accompanySeq,

            @NotNull
            Long memberSeq) {}
}
