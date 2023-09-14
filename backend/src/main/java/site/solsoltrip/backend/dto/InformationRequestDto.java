package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotNull;

public class InformationRequestDto {
    public record analysis(
            @NotNull
            Long accompanySeq,

            @NotNull
            Long memberSeq) {}
}
