package site.solsoltrip.backend.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import site.solsoltrip.backend.properties.aws.AwsProperties;
import site.solsoltrip.backend.properties.aws.AwsS3Properties;
import site.solsoltrip.backend.util.AwsS3Manager;

@Configuration
public class AppConfig {
    @Bean
    public AmazonS3 amazonS3(final AwsProperties awsProperties, final AwsS3Properties awsS3Properties) {
        final AWSCredentials credentials = new BasicAWSCredentials(awsProperties.getAccessKey(), awsProperties.getSecretKey());

        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(awsS3Properties.getRegion())
                .build();
    }

    @Bean
    public AwsS3Manager awsS3Manager(final AmazonS3 amazonS3, final AwsS3Properties awsS3Properties) {
        return new AwsS3Manager(amazonS3, awsS3Properties.getBucket());
    }
}
