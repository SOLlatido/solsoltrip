package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ShbhackRequestDto {
    private DataHeader dataHeader;

    private DataBody dataBody;

    @Getter
    public static class DataHeader {
        private final String apikey = "2023_Shinhan_SSAFY_Hackathon";
    }

    @Builder
    @Getter
    public static class DataBody {
        private String 실명번호;
    }

    @Getter
    @Builder
    public static class AccountList {
        private ShbhackRequestDto.AccountList.DataHeader dataHeader;

        private ShbhackRequestDto.AccountList.DataBody dataBody;

        @Getter
        public static class DataHeader {
            private final String apikey = "2023_Shinhan_SSAFY_Hackathon";
        }

        @Builder
        @Getter
        public static class DataBody {
            private String 실명번호;
        }
    }

    @Getter
    @Builder
    public static class CheckName {
        private ShbhackRequestDto.CheckName.DataHeader dataHeader;

        private ShbhackRequestDto.CheckName.DataBody dataBody;

        @Getter
        public static class DataHeader {
            private final String apikey = "2023_Shinhan_SSAFY_Hackathon";
        }

        @Builder
        @Getter
        public static class DataBody {
            private String 입금은행코드;
            private String 입금계좌번호;
        }
    }
}