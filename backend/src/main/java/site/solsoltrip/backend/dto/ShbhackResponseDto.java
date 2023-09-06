package site.solsoltrip.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class ShbhackResponseDto {
    private DataHeader dataHeader;

    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private String successCode;
        private String resultCode;
        private String resultMessage;
    }

    @Getter
    public static class DataBody {
        private String 고객명;
        private String 반복횟수1;
        private List<DepositAndSavings> 조회내역1;

        @Getter
        public static class DepositAndSavings {
            private String 구분;
            private String 계좌번호;
            private String 상품명;

            @JsonProperty("잔액(원화)")
            public String 잔액_통화별;
        }
    }
}