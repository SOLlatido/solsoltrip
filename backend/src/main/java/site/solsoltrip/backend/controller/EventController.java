package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/inform")
    public ResponseEntity<EventResponseDto.inform> inform(@RequestBody @Validated final EventRequestDto.inform requestDto) {
        final EventResponseDto.inform responseDto = eventService.inform(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/arrival")
    public ResponseEntity<EventResponseDto.arrivalInform> arrivalInform(@RequestBody @Validated final EventRequestDto.arrivalInform requestDto) {
        final EventResponseDto.arrivalInform responseDto = eventService.arrivalInform(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @PostMapping("/point")
    public ResponseEntity<EventResponseDto.myPointList> myPointList(@RequestBody @Validated final EventRequestDto.myPointList requestDto) {
        final EventResponseDto.myPointList responseDto = eventService.myPointList(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
