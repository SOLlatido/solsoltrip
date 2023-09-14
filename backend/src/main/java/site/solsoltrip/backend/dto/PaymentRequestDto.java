package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotNull;

public class PaymentRequestDto {
    public record paymentDetail(
            @NotNull
            Long accompanyMemberSeq,

            Long memberSeq) {}
}
