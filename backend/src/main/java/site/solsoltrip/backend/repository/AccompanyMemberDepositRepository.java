package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;

import java.util.List;

public interface AccompanyMemberDepositRepository extends JpaRepository<AccompanyMemberDeposit, Long> {
    @Query("select a from AccompanyMemberDeposit a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberDeposit> findByAccompanySeq(final Long accompanySeq);

    @Query("select a from AccompanyMemberDeposit a" +
            "join fetch a.accompany join fetch a.member" +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq")
    List<AccompanyMemberDeposit> findByAccompanySeqAndMemberSeq(final Long accompanySeq, final Long memberSeq);
}
