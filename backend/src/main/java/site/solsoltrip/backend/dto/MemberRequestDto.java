package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class MemberRequestDto {
    public record signup(
            @NotBlank
            String uuid,

            @NotBlank
            String name) {}

    public record login(
            @NotBlank
            String uuid) {}

    public record AccompanyList(
            @NotNull
            Long memberSeq) {}
}
