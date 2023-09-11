package site.solsoltrip.backend.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import site.solsoltrip.backend.dto.KakaoUserInfo;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.service.MemberService;
import site.solsoltrip.backend.utility.CookieUtility;

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

    @GetMapping("/login")
    public ResponseEntity<MemberResponseDto.login> login(@RequestBody @Validated final MemberRequestDto.login requestDto) {
        MemberResponseDto.login responseDto = memberService.login(requestDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }

    @GetMapping("/kakao")
    public ResponseEntity<MemberResponseDto.KakaoTokenInfo> kakaoSync(@RequestParam final String code, @RequestParam final Long state, HttpServletResponse response) {
        MemberResponseDto.KakaoTokenInfo responseDto = memberService.kakaoSync(code, state);

        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
