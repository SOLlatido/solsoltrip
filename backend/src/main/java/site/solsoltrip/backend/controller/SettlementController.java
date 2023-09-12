package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solsoltrip.backend.dto.SettlementRequestDto;
import site.solsoltrip.backend.dto.SettlementResponseDto;
import site.solsoltrip.backend.entity.AccompanyContent;
import site.solsoltrip.backend.entity.Category;
import site.solsoltrip.backend.service.SettlementService;
import site.solsoltrip.backend.util.NumberFormatUtility;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/settlement")
@RequiredArgsConstructor
public class SettlementController {
    private final SettlementService settlementService;

    @PatchMapping("/reset")
    public ResponseEntity<Void> resetEndTime(final SettlementRequestDto.resetEndTime requestDto) {
        settlementService.resetEndTime(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/manual")
    public ResponseEntity<Void> endTrip(final SettlementRequestDto.endTrip requestDto) {
        settlementService.endTrip(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/result")
    public ResponseEntity<SettlementResponseDto.showTripResult> showTripResult(final SettlementRequestDto.showTripResult requestDto) {
        SettlementResponseDto.showTripResult responseDto = settlementService.showTripResult(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
