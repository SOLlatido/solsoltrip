package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.IndividualWithdraw;

import java.util.List;
import java.util.Optional;

@Repository
public interface IndividualWithdrawRepository extends JpaRepository<IndividualWithdraw, Long> {
    @Query("select a from IndividualWithdraw a " +
            "join fetch a.accompanyMemberWithdraw " +
            "where a.accompanyMemberWithdraw.accompanyMemberWithdrawSeq = :accompanyMemberWithdrawSeq")
    List<IndividualWithdraw> findByAccompanyMemberWithdrawSeq(@Param("accompanyMemberWithdrawSeq") final Long accompanyMemberWithdrawSeq);

    @Query("select a from IndividualWithdraw a " +
            "join fetch a.accompanyMemberWithdraw join fetch a.member " +
            "where a.accompanyMemberWithdraw.accompanyMemberWithdrawSeq = :accompanyMemberWithdrawSeq and a.member.memberSeq = :memberSeq")
    Optional<IndividualWithdraw> findByAccompanyMemberWithdrawSeqAndMemberSeq(@Param("accompanyMemberWithdrawSeq") final Long accompanyMemberWithdrawSeq,
                                                                              @Param("memberSeq") final Long memberSeq);
}
