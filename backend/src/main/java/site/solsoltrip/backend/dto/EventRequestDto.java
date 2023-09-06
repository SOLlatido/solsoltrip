package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Range;

public class EventRequestDto {
    public record registEvent(
            @NotBlank
            String name,

            @NotBlank
            String region,

            @Range(min = 0, max = 180)
            Double x,

            @Range(min = 0, max = 180)
            Double y
    ) {}
}
