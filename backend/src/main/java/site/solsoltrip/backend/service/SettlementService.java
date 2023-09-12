package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.SettlementRequestDto;
import site.solsoltrip.backend.entity.Accompany;
import site.solsoltrip.backend.repository.AccompanyRepository;

import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SettlementService {
    private final AccompanyRepository accompanyRepository;

    @Transactional
    public void resetEndTime(final SettlementRequestDto.resetEndTime requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(requestDto.endDate());
    }

    @Transactional
    public void endTrip(final SettlementRequestDto.endTrip requestDto) {
        final Accompany accompany = accompanyRepository.findByAccompanySeq(requestDto.accompanySeq()).orElseThrow(
                () -> new IllegalArgumentException("해당하는 동행 통장이 없습니다.")
        );

        accompany.updateEndDate(LocalDate.now());
    }
}
