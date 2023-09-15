package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

            MultipartFile pictureFile,

            List<EachExpense> eachExpenseList) {}

    public record withdraw(
            @NotNull
            Long accompanySeq,

            @NotBlank
            String store,

            @NotNull
            Integer cost,

            @NotNull
            LocalDate acceptedDate,

            @NotBlank
            String category,

            @NotNull
            LocalDateTime acceptedDateTime,

            @NotBlank
            String memo,

            @NotBlank
            String picture,

            @NotNull
            LocalDateTime memoDateTime
    ) {}

    @Getter
    @Builder
    public static class EachExpense {
        private final Long memberSeq;
        private final Double cost;
    }
}
