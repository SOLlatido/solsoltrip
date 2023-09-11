package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.Role;
import site.solsoltrip.backend.oauth.KakaoOAuth2;
import site.solsoltrip.backend.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final KakaoOAuth2 kakaoOAuth2;

    private final PasswordEncoder passwordEncoder;

    public boolean checkEmailExistence(final String id) {
        return memberRepository.findById(id).isPresent();
    }

    @Transactional
    public void signup(final MemberRequestDto.signup requestDto) {
        if (checkEmailExistence(requestDto.id())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        final Member member = Member.builder()
                .id(requestDto.id())
                .password(passwordEncoder.encode(requestDto.password()))
                .name(requestDto.name())
                .point(0)
                .phone(requestDto.phone())
                .role(Role.ADMIN)
                .build();

        memberRepository.save(member);
    }

    public MemberResponseDto.login login(final MemberRequestDto.login requestDto) {
        final Member member = memberRepository.findById(requestDto.id()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        if (!passwordEncoder.matches(requestDto.password(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String accessToken = "access-token";

        MemberResponseDto.KakaoTokenInfo kakaoTokenInfo = null;

        if (member.getKakaoEmail() != null) {
            kakaoTokenInfo = kakaoOAuth2.refreshKakaoToken(member.getKakaoRefreshToken());

            if (!kakaoTokenInfo.kakaoRefreshToken().equals("null")) {
                member.updateKakaoRefreshToken(kakaoTokenInfo.kakaoRefreshToken());
            }
        }

        return kakaoTokenInfo == null ?
                MemberResponseDto.login.builder()
                        .name(member.getName())
                        .accessToken(accessToken)
                        .build() :
                MemberResponseDto.login.builder()
                        .name(member.getName())
                        .accessToken(accessToken)
                        .kakaoAccessToken(kakaoTokenInfo.kakaoAccessToken())
                        .build();
    }

    @Transactional
    public MemberResponseDto.KakaoTokenInfo kakaoSync(final String code, final Long state) {
        final MemberResponseDto.KakaoInfo userInfo = kakaoOAuth2.kakaoSync(code);

        final String email = userInfo.userInfo().getKakao_account().getEmail();

        final Member member = memberRepository.findByMemberSeq(state).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final Optional<Member> kakaoIncludedMember = memberRepository.findByKakaoEmail(email);

        if (kakaoIncludedMember.isEmpty()) {
            member.updateKakaoEmail(email);
            member.updateKakaoRefreshToken(userInfo.kakaoRefreshToken());
        }

        return MemberResponseDto.KakaoTokenInfo.builder()
                .kakaoAccessToken(userInfo.kakaoAccessToken())
                .build();
    }
}
