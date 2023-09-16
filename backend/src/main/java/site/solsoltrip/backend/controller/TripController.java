package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.TripRequestDto;
import site.solsoltrip.backend.dto.TripResponseDto;
import site.solsoltrip.backend.service.TripService;

@RestController
@RequestMapping("/api/trip")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @PostMapping("/validation")
    public ResponseEntity<TripResponseDto.validation> validation(@RequestBody @Validated final TripRequestDto.validation requestDto) {
        final TripResponseDto.validation responseDto = tripService.validation(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/regist")
    public ResponseEntity<Void> registAccount(@RequestBody @Validated final TripRequestDto.registAccount requestDto) {
        tripService.registAccount(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/detail")
    public ResponseEntity<TripResponseDto.tripDetail> movetoTripDetail(@RequestBody @Validated final TripRequestDto.tripDetail requestDto) {
        final TripResponseDto.tripDetail responseDto = tripService.movetoTripDetail(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/total")
    public ResponseEntity<TripResponseDto.totalMember> totalMember(@RequestBody @Validated final TripRequestDto.totalMember requestDto) {
        final TripResponseDto.totalMember responseDto = tripService.totalMember(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/check")
    public ResponseEntity<TripResponseDto.check> check(@RequestBody @Validated final TripRequestDto.check requestDto) {
        final TripResponseDto.check responseDto = tripService.check(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}