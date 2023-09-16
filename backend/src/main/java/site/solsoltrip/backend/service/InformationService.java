package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.InformationRequestDto;
import site.solsoltrip.backend.dto.InformationResponseDto;
import site.solsoltrip.backend.entity.*;
import site.solsoltrip.backend.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class InformationService {
    private final MemberRepository memberRepository;
    private final MemberAccompanyRepository memberAccompanyRepository;
    private final AccompanyRepository accompanyRepository;
    private final AccompanyMemberWithdrawRepository accompanyMemberWithdrawRepository;
    private final IndividualWithdrawRepository individualWithdrawRepository;

    public InformationResponseDto.analysis analysis(final InformationRequestDto.analysis requestDto) {
        // 총 지출 및 나의 총 지출
        final List<AccompanyMemberWithdraw> totalAccompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository
                        .findByAccompanySeq(requestDto.accompanySeq());

        int totalCost = 0;

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : totalAccompanyMemberWithdrawList) {
            totalCost += accompanyMemberWithdraw.getCost();
        }

        double myCost = 0;

        final Member nowUser = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        // 카테고리별 지출 금액
        final List<InformationResponseDto.AnalysisCategoryVO> categoryVOList = new ArrayList<>();

        for (final Category category : Category.values()) {
            final String categorySeq = category.getNumber();

            final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                    accompanyMemberWithdrawRepository
                            .findByAccompanySeqAndCategory(requestDto.accompanySeq(), categorySeq);

            if (accompanyMemberWithdrawList.isEmpty()) {
                continue;
            }

            double categoryCost = 0;

            for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
                final Optional<IndividualWithdraw> individualWithdraw =
                        individualWithdrawRepository
                                .findByAccompanyMemberWithdrawSeqAndMemberSeq(
                                        accompanyMemberWithdraw.getAccompanyMemberWithdrawSeq(),
                                        requestDto.memberSeq()
                                );

                if (individualWithdraw.isEmpty()) {
                    continue;
                }

                categoryCost += individualWithdraw.get().getIndividual();
            }

            final InformationResponseDto.AnalysisCategoryVO categoryVO =
                    InformationResponseDto.AnalysisCategoryVO.builder()
                            .category(categorySeq)
                            .cost(categoryCost)
                            .build();

            categoryVOList.add(categoryVO);
        }

        // 인원별 지출 금액
        final List<AccompanyMemberWithdraw> accompanyMemberWithdrawList =
                accompanyMemberWithdrawRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<MemberAccompany> memberAccompanyList =
                memberAccompanyRepository.findByAccompanySeq(requestDto.accompanySeq());

        final List<String> eachActualUsageUuid = new ArrayList<>();

        for (final MemberAccompany memberAccompany : memberAccompanyList) {
            final Member member = memberAccompany.getMember();

            eachActualUsageUuid.add(member.getUuid());
        }

        final double[] eachActualUsage = new double[eachActualUsageUuid.size()];

        final List<InformationResponseDto.AnalysisIndividualVO> individualVOList = new ArrayList<>();

        for (final AccompanyMemberWithdraw accompanyMemberWithdraw : accompanyMemberWithdrawList) {
            final Long accompanyMemberWithdrawSeq = accompanyMemberWithdraw.getAccompanyMemberWithdrawSeq();

            final List<IndividualWithdraw> individualWithdrawList =
                    individualWithdrawRepository.findByAccompanyMemberWithdrawSeq(accompanyMemberWithdrawSeq);

            for (final IndividualWithdraw individualWithdraw : individualWithdrawList) {
                final Member member = individualWithdraw.getMember();

                final int memberLocation = eachActualUsageUuid.indexOf(member.getUuid());

                eachActualUsage[memberLocation] += individualWithdraw.getIndividual();
            }
        }

        for (final String uuid : eachActualUsageUuid) {
            final Member member = memberRepository.findByUuid(uuid).orElseThrow(
                    () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
            );

            final int memberLocation = eachActualUsageUuid.indexOf(member.getUuid());

            final double individualCost = eachActualUsage[memberLocation];

            final InformationResponseDto.AnalysisIndividualVO individualVO =
                    InformationResponseDto.AnalysisIndividualVO.builder()
                            .name(member.getName())
                            .cost(individualCost)
                            .build();

            individualVOList.add(individualVO);

            if (uuid.equals(nowUser.getUuid())) {
                myCost = individualCost;
            }
        }

        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        final int expenseGoal = accompany.getIndividual() * eachActualUsageUuid.size();

        return InformationResponseDto.analysis.builder()
                .totalCost(totalCost)
                .myCost(myCost)
                .expenseGoal(expenseGoal)
                .categoryVO(categoryVOList)
                .individualVO(individualVOList)
                .build();
    }
}
