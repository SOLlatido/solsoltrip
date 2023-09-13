package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;

import java.util.List;

public interface AccompanyMemberDepositRepository extends JpaRepository<AccompanyMemberDeposit, Long> {
    @Query("select a from AccompanyMemberDeposit a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberDeposit> findByAccompanySeq(@Param("accompanySeq") final Long accompanySeq);

    @Query(value = "select a from AccompanyMemberDeposit a " +
            "join fetch a.accompany join fetch a.member " +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq",
            nativeQuery = true)
    List<AccompanyMemberDeposit> findByAccompanySeqAndMemberSeq(@Param("accompanySeq") final Long accompanySeq,
                                                                @Param("memberSeq") final Long memberSeq);
}
