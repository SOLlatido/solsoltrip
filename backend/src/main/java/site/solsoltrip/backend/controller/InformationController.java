package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solsoltrip.backend.dto.InformationRequestDto;
import site.solsoltrip.backend.dto.InformationResponseDto;
import site.solsoltrip.backend.service.InformationService;

@RestController
@RequestMapping("/api/info")
@RequiredArgsConstructor
public class InformationController {
    private final InformationService informationService;

    @PostMapping("/analysis")
    public ResponseEntity<InformationResponseDto.analysis> analysis(@RequestBody @Validated final InformationRequestDto.analysis requestDto) {
        InformationResponseDto.analysis responseDto = informationService.analysis(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
