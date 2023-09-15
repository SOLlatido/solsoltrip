package site.solsoltrip.backend.oauth;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import site.solsoltrip.backend.dto.KakaoUserInfo;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.properties.kakao.KakaoProperties;

@Component
@RequiredArgsConstructor
public class KakaoOAuth2 {
    private final KakaoProperties kakaoProperties;

    public MemberResponseDto.KakaoInfo kakaoSync(final String code) {
        final Gson gson = new Gson();

        final JSONObject tokenInfo = generateToken(code);

        final String kakaoAccessToken = String.valueOf(tokenInfo.get("access_token"));
        final String kakaoRefreshToken = String.valueOf(tokenInfo.get("refresh_token"));

        final JSONObject userInfo = findUserInfo(kakaoAccessToken);

        final KakaoUserInfo.UserInfo kakaoUserInfo = gson.fromJson(userInfo.toJSONString(), KakaoUserInfo.UserInfo.class);

        return MemberResponseDto.KakaoInfo.builder()
                .userInfo(kakaoUserInfo)
                .kakaoAccessToken(kakaoAccessToken)
                .kakaoRefreshToken(kakaoRefreshToken)
                .build();
    }

    public MemberResponseDto.KakaoTokenInfo refreshKakaoToken(final String refreshToken) {
        final JSONObject tokenSet = refreshToken(refreshToken);

        final String kakaoAccessToken = String.valueOf(tokenSet.get("access_token"));
        final String kakaoRefreshToken = String.valueOf(tokenSet.get("refresh_token"));

        return MemberResponseDto.KakaoTokenInfo.builder()
                .kakaoAccessToken(kakaoAccessToken)
                .kakaoRefreshToken(kakaoRefreshToken)
                .build();
    }

    private JSONObject generateToken(final String code) {
        final MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("code", code);
        formData.add("client_id", kakaoProperties.getClientId());
        formData.add("grant_type", kakaoProperties.getGrantType());
        formData.add("redirect_uri", kakaoProperties.getRedirectUri());

        return WebClient.builder()
                .baseUrl("https://kauth.kakao.com/oauth/token")
                .build()
                .post()
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
    }

    private JSONObject refreshToken(final String nowRefreshToken) {
        final MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        formData.add("client_id", kakaoProperties.getClientId());
        formData.add("grant_type", kakaoProperties.getRefreshGrantType());
        formData.add("refresh_token", nowRefreshToken);

        return WebClient.builder()
                .baseUrl("https://kauth.kakao.com/oauth/token")
                .build()
                .post()
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
    }

    private JSONObject findUserInfo(final String kakaoAccessToken) {
        return WebClient.builder()
                .baseUrl("https://kapi.kakao.com/v2/user/me")
                .build()
                .post()
                .header("Content-type", "application/x-www-form-urlencoded;charset=utf-8")
                .header("Authorization", "Bearer " + kakaoAccessToken)
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
    }
}
