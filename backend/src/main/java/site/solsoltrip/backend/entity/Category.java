package site.solsoltrip.backend.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Category {
    숙소("0"),
    항공("1"),
    교통("2"),
    관광("3"),
    식비("4"),
    쇼핑("5"),
    기타("6"),
    입금("7");

    private final String number;
}
