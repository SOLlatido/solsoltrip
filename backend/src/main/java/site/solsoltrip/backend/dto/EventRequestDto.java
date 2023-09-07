package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public class EventRequestDto {
    public record registEvent(
            @NotBlank
            String name,

            @Range(min = 0, max = 180)
            Double x,

            @Range(min = 0, max = 180)
            Double y
    ) {}

    public record nearbyOrArrivalInform(
            @NotNull
            Long memberSeq,

            @NotBlank
            String region,

            @Range(min = 0, max = 180)
            Double x,

            @Range(min = 0, max = 180)
            Double y
    ) {}
}
