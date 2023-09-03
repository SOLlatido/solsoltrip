package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class TripRequestDto {
    public record validation (
//            @NotBlank
            Long memberSeq
    ) {}
}
