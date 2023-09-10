package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EventRequestDto {
    public record registEvent(
            @NotBlank
            String name,

            @DecimalMax("131.872222")
            @DecimalMin("125.066667")
            Double x,

            @DecimalMax("38.450000")
            @DecimalMin("33.100000")
            Double y
    ) {}

    public record nearbyOrArrivalInform(
            @NotNull
            Long memberSeq,

            @DecimalMax("131.872222")
            @DecimalMin("125.066667")
            Double x,

            @DecimalMax("38.450000")
            @DecimalMin("33.100000")
            Double y
    ) {}
}
