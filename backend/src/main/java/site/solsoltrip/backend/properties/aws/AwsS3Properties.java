package site.solsoltrip.backend.properties.aws;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "aws.s3")
@RequiredArgsConstructor
@Getter
public class AwsS3Properties {
    private final String region;

    private final String bucket;

    private final String url;
}
