package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class PaymentResponseDto {
    @Builder
    public record paymentDetail(Deposit deposit, Withdraw withdraw) {}

    @Getter
    @Builder
    public static class Deposit {
        private final String name;
        private final String memo;
        private final Integer cost;
        private final String category;
        private final LocalDateTime time;
        private final String picture;
    }

    @Getter
    @Builder
    public static class Withdraw {
        private final String name;
        private final String memo;
        private final Integer cost;
        private final String category;
        private final LocalDateTime time;
        private final String picture;
    }
}
