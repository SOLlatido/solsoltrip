package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

public class MemberResponseDto {
    @Builder
    public record signup(String uuid,
                         String name) {}

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

    @Builder
    public record AccompanyList(List<AccompanyListVO> accompanyList) {}

    @Getter
    public static class AccompanyListVO {
        private final Long accompanySeq;
        private final String account;
        private final String name;
        private final LocalDate startDate;
        private final LocalDate endDate;
        private final Integer personNum;

        @Builder
        public AccompanyListVO(final Long accompanySeq,
                               final String account,
                               final String name,
                               final LocalDate startDate,
                               final LocalDate endDate,
                               final Integer personNum) {
            this.accompanySeq = accompanySeq;
            this.account = account;
            this.name = name;
            this.startDate = startDate;
            this.endDate = endDate;
            this.personNum = personNum;
        }
    }
}
