package site.solsoltrip.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import site.solsoltrip.backend.properties.aws.AwsProperties;
import site.solsoltrip.backend.properties.aws.AwsS3Properties;
import site.solsoltrip.backend.properties.kakao.KakaoProperties;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
@EnableConfigurationProperties({
		KakaoProperties.class,
		AwsProperties.class,
		AwsS3Properties.class
})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
