package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.SettlementRequestDto;
import site.solsoltrip.backend.dto.SettlementResponseDto;
import site.solsoltrip.backend.service.SettlementService;

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

    @PostMapping("/result")
    public ResponseEntity<SettlementResponseDto.showTripResult> showTripResult(final SettlementRequestDto.showTripResult requestDto) {
        SettlementResponseDto.showTripResult responseDto = settlementService.checkShowTripResult(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PatchMapping("/settle")
    public ResponseEntity<SettlementResponseDto.settleUp> settleUp(final SettlementRequestDto.settleUp requestDto) {
        final SettlementResponseDto.settleUp responseDto = settlementService.settleUp(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
