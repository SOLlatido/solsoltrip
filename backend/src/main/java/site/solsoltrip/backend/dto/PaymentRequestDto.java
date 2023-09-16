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

            String eachExpenseList) {}

    public record deposit(
            @NotBlank
            String name,

            @NotBlank
            String code,

            @NotBlank
            String myAccount,

            @NotBlank
            String account,

            @NotNull
            Integer cost) {}

    public record withdraw(
            @NotBlank
            String account,

            @NotBlank
            String store,

            @NotNull
            Integer cost,

            @NotBlank
            String category) {}

    @Getter
    @Builder
    public static class EachExpense {
        private final Long memberSeq;
        private final Double cost;
    }
}
