package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public class PaymentRequestDto {
    public record paymentDetail(
            @NotNull
            Long accompanyMemberSeq,

            Long memberSeq) {}

    public record editPaymentDetail(
            @NotNull
            Long accompanyMemberWithdrawSeq,

            String category,

            String memo,

            MultipartFile pictureFile) {}
}
