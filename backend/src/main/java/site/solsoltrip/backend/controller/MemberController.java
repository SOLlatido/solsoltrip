package site.solsoltrip.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.service.MemberService;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto.signup> signup(@RequestBody @Validated final MemberRequestDto.signup requestDto) {
        memberService.signup(requestDto);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponseDto.login> login(@RequestBody @Validated final MemberRequestDto.login requestDto) {
        MemberResponseDto.login responseDto = memberService.login(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/kakao")
    public ResponseEntity<MemberResponseDto.KakaoTokenInfo> kakaoSync(@RequestParam final String code, @RequestParam final Long state) {
        MemberResponseDto.KakaoTokenInfo responseDto = memberService.kakaoSync(code, state);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
