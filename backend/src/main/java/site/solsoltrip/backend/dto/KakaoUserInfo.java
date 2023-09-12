package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

public class KakaoUserInfo {
    @Getter
    @Builder
    public static class UserInfo {
        private final KakaoAccount kakao_account;

        @Getter
        @Builder
        public static class KakaoAccount {
            private String email;
        }
    }
}