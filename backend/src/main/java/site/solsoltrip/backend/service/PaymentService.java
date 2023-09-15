package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import site.solsoltrip.backend.dto.PaymentRequestDto;
import site.solsoltrip.backend.dto.PaymentResponseDto;
import site.solsoltrip.backend.entity.*;
import site.solsoltrip.backend.properties.aws.AwsS3Properties;
import site.solsoltrip.backend.repository.AccompanyMemberDepositRepository;
import site.solsoltrip.backend.repository.AccompanyMemberWithdrawRepository;
import site.solsoltrip.backend.repository.IndividualWithdrawRepository;
import site.solsoltrip.backend.repository.MemberAccompanyRepository;
import site.solsoltrip.backend.util.AwsS3Manager;
import site.solsoltrip.backend.util.FileUtility;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.UnaryOperator;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PaymentService {
    private final AccompanyMemberDepositRepository accompanyMemberDepositRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;
    private final IndividualWithdrawRepository individualWithdrawRepository;
    private final MemberAccompanyRepository memberAccompanyRepository;

    private final AwsS3Manager awsS3Manager;
    private final AwsS3Properties awsS3Properties;

    public PaymentResponseDto.paymentDetail paymentDetail(final PaymentRequestDto.paymentDetail requestDto) {
        PaymentResponseDto.Deposit deposit = null;
        PaymentResponseDto.Withdraw withdraw = null;

        if (requestDto.memberSeq() != null) {
            final AccompanyMemberDeposit accompanyMemberDeposit =
                    accompanyMemberDepositRepository.findByAccompanyMemberDepositSeq(requestDto.accompanyMemberSeq())
                            .orElseThrow(() -> new IllegalArgumentException("입금 내역을 찾을 수 없습니다."));

            deposit = PaymentResponseDto.Deposit.builder()
                    .name(accompanyMemberDeposit.getName())
                    .cost(accompanyMemberDeposit.getCost())
                    .category(accompanyMemberDeposit.getCategory())
                    .time(accompanyMemberDeposit.getAcceptedDateTime())
                    .build();
        } else {
            final AccompanyMemberWithdraw accompanyMemberWithdraw =
                    accompanyMemberWithdrawRepository.findByAccompanyMemberWithdrawSeq(requestDto.accompanyMemberSeq())
                            .orElseThrow(() -> new IllegalArgumentException("출금 내역을 찾을 수 없습니다."));

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

    @Transactional
    public void editPaymentDetail(final PaymentRequestDto.editPaymentDetail requestDto) {
        final AccompanyMemberWithdraw accompanyMemberWithdraw =
                accompanyMemberWithdrawRepository
                        .findByAccompanyMemberWithdrawSeq(requestDto.accompanyMemberWithdrawSeq())
                        .orElseThrow(() -> new IllegalArgumentException("출금 내역을 찾을 수 없습니다."));

        accompanyMemberWithdraw.updateWithdrawRecord(requestDto.category(), requestDto.memo(), LocalDateTime.now());

        uploadPicture(requestDto.accompanyMemberWithdrawSeq(), requestDto.pictureFile());

        changeEachExpense(requestDto.accompanyMemberWithdrawSeq(), requestDto.eachExpenseList());
    }

    @Transactional
    public void deposit(final PaymentRequestDto.deposit requestDto) {
        final AccompanyMemberDeposit accompanyMemberDeposit = AccompanyMemberDeposit.builder()
                .name(requestDto.name())
                .cost(requestDto.cost())
                .acceptedDate(LocalDate.now())
                .category(requestDto.category())
                .acceptedDateTime(LocalDateTime.now())
                .build();

        accompanyMemberDepositRepository.save(accompanyMemberDeposit);
    }

    @Transactional
    public void withdraw(final PaymentRequestDto.withdraw requestDto) {
        final AccompanyMemberWithdraw accompanyMemberWithdraw = AccompanyMemberWithdraw.builder()
                .store(requestDto.store())
                .cost(requestDto.cost())
                .acceptedDate(LocalDate.now())
                .category(requestDto.category())
                .acceptedDateTime(LocalDateTime.now())
                .build();

        accompanyMemberWithdrawRepository.save(accompanyMemberWithdraw);

        List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository
                        .findByAccompanySeqOrderByAccompanyMemberWithdrawSeqDesc(requestDto.accompanySeq());

        if (accompanyMemberWithdrawList.isEmpty()) {
            throw new IllegalArgumentException("출금이 저장되지 않았습니다.");
        }

        final AccompanyMemberWithdraw foundAccompanyMemberWithdraw = accompanyMemberWithdrawList.get(0);

        final List<MemberAccompany> memberAccompanyList = memberAccompanyRepository.findByAccompanySeq(requestDto.accompanySeq());

        final int size = memberAccompanyList.size();

        final double eachWithdraw = (double) requestDto.cost() / size;

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member member = memberAccompany.getMember();

            final IndividualWithdraw individualWithdraw = IndividualWithdraw.builder()
                    .member(member)
                    .accompanyMemberWithdraw(foundAccompanyMemberWithdraw)
                    .individual(eachWithdraw)
                    .isIncluded(true)
                    .build();

            individualWithdrawRepository.save(individualWithdraw);
        }
    }

    @Transactional
    private void changeEachExpense(final Long accompanyMemberWithdrawSeq, final List<PaymentRequestDto.EachExpense> eachExpenseList) {
        final List<IndividualWithdraw> individualWithdrawList =
                individualWithdrawRepository.findByAccompanyMemberWithdrawSeq(accompanyMemberWithdrawSeq);

        for (final IndividualWithdraw individualWithdraw : individualWithdrawList) {
            for (int seq = 0; seq < eachExpenseList.size(); seq++) {
                if (!eachExpenseList.get(seq).getMemberSeq().equals(individualWithdraw.getMember().getMemberSeq())) {
                    continue;
                }

                individualWithdraw.updateIndividualWithdraw(eachExpenseList.get(seq).getCost(), true);
            }
        }
    }

    @Transactional
    private void uploadPicture(final Long accompanyMemberWithdrawSeq, final MultipartFile pictureFile) {
        final AccompanyMemberWithdraw accompanyMemberWithdraw =
                accompanyMemberWithdrawRepository.findByAccompanyMemberWithdrawSeq(accompanyMemberWithdrawSeq)
                        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        final String contentType = pictureFile.getContentType();

        if (contentType == null) {
            throw new IllegalArgumentException("CONTENT_TYPE이 존재하지 않습니다.");
        }

        if (!contentType.matches("(^image)(/)\\w*")) {
            throw new IllegalArgumentException("지원하지 않는 형식의 CONTENT_TYPE입니다.");
        }

        final UnaryOperator<String> titleGenerator = createPictureTitleGenerator(String.valueOf(accompanyMemberWithdrawSeq), accompanyMemberWithdraw.getStore());

        final String picturePath = awsS3Manager.uploadFiles(titleGenerator, List.of(pictureFile)).get(0);

        String storageUrl = awsS3Properties.getUrl();

        if (!storageUrl.endsWith("/")) {
            storageUrl += '/';
        }

        accompanyMemberWithdraw.updatePicture(storageUrl + picturePath);
    }

    public static UnaryOperator<String> createPictureTitleGenerator(final String seq, final String title) {
        return originalFileName -> seq + "/" + title + FileUtility.getFileExtension(originalFileName);
    }

}
