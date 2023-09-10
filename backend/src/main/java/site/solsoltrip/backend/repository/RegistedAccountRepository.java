package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.RegistedAccount;

import java.util.List;

public interface RegistedAccountRepository extends JpaRepository<RegistedAccount, Long> {
    @Query("select a from RegistedAccount a join fetch a.member where a.member.memberSeq = :memberSeq")
    List<RegistedAccount> findByMemberSeqJoinFetchMember(final Long memberSeq);
}