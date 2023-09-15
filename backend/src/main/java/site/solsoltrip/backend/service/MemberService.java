package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.MemberAccompany;
import site.solsoltrip.backend.entity.Role;
import site.solsoltrip.backend.oauth.KakaoOAuth2;
import site.solsoltrip.backend.repository.MemberAccompanyRepository;
import site.solsoltrip.backend.repository.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberAccompanyRepository memberAccompanyRepository;

    private final KakaoOAuth2 kakaoOAuth2;

    public void signup(final MemberRequestDto.signup requestDto) {
        if (memberRepository.findByUuid(requestDto.uuid()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 유저입니다.");
        }

        final Member member = Member.builder()
                .uuid(requestDto.uuid())
                .name(requestDto.name())
                .point(0)
                .role(Role.USER.name())
                .build();

        memberRepository.save(member);
    }

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

    public MemberResponseDto.AccompanyList accompanyList(final MemberRequestDto.AccompanyList requestDto) {
        final List<MemberAccompany> memberAccompanyList = memberAccompanyRepository.findByMemberSeq(requestDto.memberSeq());

        final List<MemberResponseDto.AccompanyListVO> accompanyList = new ArrayList<>();

        for (MemberAccompany memberAccompany : memberAccompanyList) {
            final int personNum = memberAccompanyRepository.findByAccompanySeq(memberAccompany.getMemberAccompanySeq()).size();

            accompanyList.add(MemberResponseDto.AccompanyListVO.builder()
                    .accompanySeq(memberAccompany.getAccompany().getAccompanySeq())
                    .account(memberAccompany.getAccompany().getAccount())
                    .name(memberAccompany.getAccompany().getName())
                    .startDate(memberAccompany.getAccompany().getStartDate())
                    .endDate(memberAccompany.getAccompany().getEndDate())
                    .personNum(personNum)
                    .build());
        }

        return MemberResponseDto.AccompanyList.builder()
                .accompanyList(accompanyList)
                .build();
    }
}
