package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccompanyMemberDepositRepository extends JpaRepository<AccompanyMemberDeposit, Long> {
    Optional<AccompanyMemberDeposit> findByAccompanyMemberDepositSeq(final Long accompanyMemberDepositSeq);

    @Query("select a from AccompanyMemberDeposit a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberDeposit> findByAccompanySeq(@Param("accompanySeq") final Long accompanySeq);

    @Query("select a from AccompanyMemberDeposit a " +
            "join fetch a.accompany join fetch a.member " +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq")
    List<AccompanyMemberDeposit> findByAccompanySeqAndMemberSeq(@Param("accompanySeq") final Long accompanySeq,
                                                                @Param("memberSeq") final Long memberSeq);
}
