package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByMemberSeq(final Long memberSeq);

    Optional<Member> findByUuid(final String uuid);

    Optional<Member> findByKakaoEmail(final String email);
}
