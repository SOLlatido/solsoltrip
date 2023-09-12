package site.solsoltrip.backend.properties;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth2.kakao")
@RequiredArgsConstructor
@Getter
public class KakaoProperties {
    private final String clientId;

    private final String grantType;

    private final String redirectUri;

    private final String refreshGrantType;
}
