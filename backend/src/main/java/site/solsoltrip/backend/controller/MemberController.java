package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.service.MemberService;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody @Validated final MemberRequestDto.signup requestDto) {
        memberService.signup(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponseDto.login> login(@RequestBody @Validated final MemberRequestDto.login requestDto) {
        MemberResponseDto.login responseDto = memberService.login(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
