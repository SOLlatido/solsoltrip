package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
}
