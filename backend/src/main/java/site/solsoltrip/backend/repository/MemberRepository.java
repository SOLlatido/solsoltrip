package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(final String email);
}
