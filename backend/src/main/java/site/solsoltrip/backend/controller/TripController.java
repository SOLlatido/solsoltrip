package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.TripRequestDto;
import site.solsoltrip.backend.service.TripService;

@RestController
@RequestMapping("/api/trip")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;

    @PostMapping("/validation")
    public ResponseEntity<Void> validation(@RequestBody @Validated final TripRequestDto.validation requestDto) {
        tripService.validation(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/regist")
    public ResponseEntity<Void> registAccount(@RequestBody @Validated final TripRequestDto.registAccount requestDto) {
        tripService.registAccount(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/detail")
    public ResponseEntity<Void> movetoTripDetail(@RequestBody @Validated final TripRequestDto.tripDetail requestDto) {
        TripResponseDto.tripDetail responseDto = tripService.movetoTripDetail(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}