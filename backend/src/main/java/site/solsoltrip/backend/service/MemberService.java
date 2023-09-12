package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.oauth.KakaoOAuth2;
import site.solsoltrip.backend.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final KakaoOAuth2 kakaoOAuth2;

    public MemberResponseDto.login login(final MemberRequestDto.login requestDto) {
        final Member member = memberRepository.findByUuid(requestDto.uuid()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

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
                        .memberSeq(member.getMemberSeq())
                        .uuid(member.getUuid())
                        .name(member.getName())
                        .point(member.getPoint())
                        .accessToken(accessToken)
                        .build() :
                MemberResponseDto.login.builder()
                        .memberSeq(member.getMemberSeq())
                        .uuid(member.getUuid())
                        .name(member.getName())
                        .point(member.getPoint())
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
