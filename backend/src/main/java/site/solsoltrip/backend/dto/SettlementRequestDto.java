package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class SettlementRequestDto {
    public record resetEndTime(
            @NotNull
            Long accompanySeq,

            @FutureOrPresent
            LocalDateTime endDateTime) {}

    public record endTrip(
            @NotNull
            Long accompanySeq) {}
}
