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

}
