package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class SettlementRequestDto {
    public record resetEndTime(
            @NotNull
            Long accompanySeq,

            @FutureOrPresent
            LocalDate endDate) {}

    public record endTrip(
            @NotNull
            Long accompanySeq) {}
}
