package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.PaymentRequestDto;
import site.solsoltrip.backend.dto.PaymentResponseDto;
import site.solsoltrip.backend.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/detail")
    public ResponseEntity<PaymentResponseDto.paymentDetail> paymentDetail(@RequestBody @Validated final PaymentRequestDto.paymentDetail requestDto) {
        PaymentResponseDto.paymentDetail responseDto = paymentService.paymentDetail(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PatchMapping(value = "/edit", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> editPaymentDetail(@ModelAttribute @Validated final PaymentRequestDto.editPaymentDetail requestDto) {
        paymentService.editPaymentDetail(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/deposit")
    public ResponseEntity<Void> deposit(@RequestBody @Validated final PaymentRequestDto.deposit requestDto) {
        paymentService.deposit(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/withdraw")
    public ResponseEntity<Void> withdraw(@RequestBody @Validated final PaymentRequestDto.withdraw requestDto) {
        paymentService.withdraw(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
