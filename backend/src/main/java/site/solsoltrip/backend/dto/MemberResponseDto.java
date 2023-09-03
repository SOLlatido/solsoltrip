package site.solsoltrip.backend.dto;

import lombok.Builder;

public class MemberResponseDto {
    @Builder
    public record login(String name) {}
}
