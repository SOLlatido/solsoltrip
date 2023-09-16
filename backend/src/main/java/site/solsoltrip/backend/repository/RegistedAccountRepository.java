package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solsoltrip.backend.entity.RegistedAccount;

import java.util.List;
import java.util.Optional;

public interface RegistedAccountRepository extends JpaRepository<RegistedAccount, Long> {
    Optional<RegistedAccount> findByRegistedAccountSeq(final Long registedAccountSeq);

    @Query("select a from RegistedAccount a join fetch a.member where a.member.memberSeq = :memberSeq")
    List<RegistedAccount> findByMemberSeqJoinFetchMember(@Param("memberSeq") final Long memberSeq);

    Optional<RegistedAccount> findByAccount(final String account);
}