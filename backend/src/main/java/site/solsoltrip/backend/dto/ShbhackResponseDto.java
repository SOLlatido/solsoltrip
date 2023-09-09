package site.solsoltrip.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ShbhackResponseDto {
    private DataHeader dataHeader;

    private DataBody dataBody;

    @Builder
    @Getter
    public static class DataHeader {
        private String successCode;

        private String resultCode;

        private String resultMessage;
    }

    @Builder
    @Getter
    public static class DataBody {
        private String 고객명;

        private String 반복횟수;

        private List<DepositAndSavings> 조회내역1;

        @Builder
        @Getter
        public static class DepositAndSavings {
            private String 구분;
            private String 계좌번호;
            private String 상품명;
            public String 잔액;
        }
    }
}