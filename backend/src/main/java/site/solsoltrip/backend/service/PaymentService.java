package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.PaymentRequestDto;
import site.solsoltrip.backend.dto.PaymentResponseDto;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;
import site.solsoltrip.backend.repository.AccompanyMemberDepositRepository;
import site.solsoltrip.backend.repository.AccompanyMemberWithdrawRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PaymentService {
    private final AccompanyMemberDepositRepository accompanyMemberDepositRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;

    public PaymentResponseDto.paymentDetail paymentDetail(final PaymentRequestDto.paymentDetail requestDto) {
        PaymentResponseDto.Deposit deposit = null;
        PaymentResponseDto.Withdraw withdraw = null;

        if (requestDto.memberSeq() != null) {
            final AccompanyMemberDeposit accompanyMemberDeposit =
                    accompanyMemberDepositRepository.findByAccompanyMemberDepositSeq(requestDto.accompanyMemberSeq())
                            .orElseThrow(
                                    () -> new IllegalArgumentException("")
                            );

            deposit = PaymentResponseDto.Deposit.builder()
                    .name(accompanyMemberDeposit.getStore())
                    .cost(accompanyMemberDeposit.getCost())
                    .category(accompanyMemberDeposit.getCategory())
                    .time(accompanyMemberDeposit.getAcceptedDateTime())
                    .build();
        } else {
            final AccompanyMemberWithdraw accompanyMemberWithdraw =
                    accompanyMemberWithdrawRepository.findByAccompanyMemberWithdrawSeq(requestDto.accompanyMemberSeq())
                            .orElseThrow(
                                    () -> new IllegalArgumentException("")
                            );

            withdraw = PaymentResponseDto.Withdraw.builder()
                    .name(accompanyMemberWithdraw.getStore())
                    .memo(accompanyMemberWithdraw.getMemo())
                    .cost(accompanyMemberWithdraw.getCost())
                    .category(accompanyMemberWithdraw.getCategory())
                    .time(accompanyMemberWithdraw.getAcceptedDateTime())
                    .picture(accompanyMemberWithdraw.getPicture())
                    .build();
        }

        return PaymentResponseDto.paymentDetail.builder()
                .deposit(deposit)
                .withdraw(withdraw)
                .build();
    }
}
