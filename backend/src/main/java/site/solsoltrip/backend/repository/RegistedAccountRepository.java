package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.RegistedAccount;

import java.util.Optional;

public interface RegistedAccountRepository extends JpaRepository<RegistedAccount, Long> {
    Optional<RegistedAccount> findByMemberSeq(final Long memberSeq);
}
