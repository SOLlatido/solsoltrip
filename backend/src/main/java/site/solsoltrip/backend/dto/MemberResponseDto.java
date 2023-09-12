package site.solsoltrip.backend.dto;

import lombok.Builder;

public class MemberResponseDto {
    @Builder
    public record login(String name, String accessToken, String kakaoAccessToken) {}

    @Builder
    public record KakaoInfo(KakaoUserInfo.UserInfo userInfo, String kakaoAccessToken, String kakaoRefreshToken) {}

    @Builder
    public record KakaoTokenInfo(String kakaoAccessToken, String kakaoRefreshToken) {}
}
