package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.*;

public class EventRequestDto {
    public record registEvent(
            @NotBlank
            String name,

            @NotBlank
            @Size(max = 100)
            String description,

            @DecimalMax("131.872222")
            @DecimalMin("125.066667")
            Double x,

            @DecimalMax("38.450000")
            @DecimalMin("33.100000")
            Double y) {}

    public record inform(
            @NotNull
            Long memberSeq,

            @DecimalMax("131.872222")
            @DecimalMin("125.066667")
            Double x,

            @DecimalMax("38.450000")
            @DecimalMin("33.100000")
            Double y) {}

    public record arrivalInform(
            @NotNull
            Long memberSeq,

            @NotNull
            Long eventSeq,

            @DecimalMax("131.872222")
            @DecimalMin("125.066667")
            Double x,

            @DecimalMax("38.450000")
            @DecimalMin("33.100000")
            Double y) {}

    public record myPointList(
            @NotNull
            Long memberSeq) {}
}
