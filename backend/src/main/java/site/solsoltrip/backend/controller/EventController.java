package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.EventRequestDto;
import site.solsoltrip.backend.dto.EventResponseDto;
import site.solsoltrip.backend.service.EventService;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @PostMapping("/regist")
    public ResponseEntity<Void> registEvent(@RequestBody @Validated final EventRequestDto.registEvent requestDto) {
        eventService.registEvent(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/nearby")
    public ResponseEntity<EventResponseDto.nearbyInform> nearbyInform(@RequestBody @Validated final EventRequestDto.nearbyInform requestDto) {
        final EventResponseDto.nearbyInform responseDto = eventService.nearbyInform(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
