package site.solsoltrip.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.MemberRequestDto;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.Role;
import site.solsoltrip.backend.repository.MemberRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public boolean checkEmailExistence(final String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public void signup(final MemberRequestDto.signup requestDto) {
        if (checkEmailExistence(requestDto.email())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        final Member member = Member.builder()
                .email(requestDto.email())
                .password(passwordEncoder.encode(requestDto.password()))
                .phone(requestDto.phone())
                .role(Role.USER)
                .build();

        memberRepository.save(member);
    }
}
