package site.solsoltrip.backend.dto;

import lombok.Builder;

public class MemberResponseDto {
    @Builder
    public record login(Long memberSeq,
                        String uuid,
                        String name,
                        Integer point,
                        String kakaoEmail,
                        String accessToken,
                        String kakaoAccessToken) {}

    @Builder
    public record KakaoInfo(KakaoUserInfo.UserInfo userInfo,
                            String kakaoAccessToken,
                            String kakaoRefreshToken) {}

    @Builder
    public record KakaoTokenInfo(String kakaoAccessToken,
                                 String kakaoRefreshToken) {}
}
