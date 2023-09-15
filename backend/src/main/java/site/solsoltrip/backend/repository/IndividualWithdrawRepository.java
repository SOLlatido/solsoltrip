package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solsoltrip.backend.entity.IndividualWithdraw;

import java.util.List;
import java.util.Optional;

public interface IndividualWithdrawRepository extends JpaRepository<IndividualWithdraw, Long> {
    @Query(value = "select a from IndividualWithdraw a " +
            "join fetch a.accompany_member_withdraw " +
            "where a.accompany_member_withdraw.accompanyMemberWithdrawSeq = :accompanyMemberWithdrawSeq",
            nativeQuery = true)
    List<IndividualWithdraw> findByAccompanyMemberWithdrawSeq(@Param("accompanyMemberWithdrawSeq") final Long accompanyMemberWithdrawSeq);

    @Query(value = "select a from IndividualWithdraw a " +
            "join fetch a.accompany_member_withdraw join fetch a.member " +
            "where a.accompany_member_withdraw.accompanyMemberWithdrawSeq = :accompanyMemberWithdrawSeq and a.member.memberSeq = :memberSeq",
            nativeQuery = true)
    Optional<IndividualWithdraw> findByAccompanyMemberWithdrawSeqAndMemberSeq(@Param("accompanyMemberWithdrawSeq") final Long accompanyMemberWithdrawSeq,
                                                                              @Param("memberSeq") final Long memberSeq);
}
