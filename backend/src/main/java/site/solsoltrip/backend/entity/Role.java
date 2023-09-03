package site.solsoltrip.backend.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    USER("유저"),
    ADMIN("관리자");

    private final String key;
}
