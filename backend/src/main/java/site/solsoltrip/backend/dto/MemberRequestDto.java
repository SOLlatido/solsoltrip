package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class MemberRequestDto {
    public record login(
            @NotBlank
            String uuid) {}
}
