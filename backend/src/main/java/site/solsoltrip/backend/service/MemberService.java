package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.dto.MemberResponseDto;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.Role;
import site.solsoltrip.backend.repository.MemberRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

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

        return MemberResponseDto.login.builder()
                .name(member.getName())
                .build();
    }
}
