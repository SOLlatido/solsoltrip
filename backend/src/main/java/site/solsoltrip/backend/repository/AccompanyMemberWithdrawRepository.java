package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;

import java.time.LocalDate;
import java.util.List;

public interface AccompanyMemberWithdrawRepository extends JpaRepository<AccompanyMemberWithdraw, Long> {
    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberWithdraw> findByAccompanySeq(final Long accompanySeq);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.category = :category")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndCategory(final Long accompanySeq, final int category);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.acceptedDate = :acceptedDate")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndAcceptedDate(final Long accompanySeq, final LocalDate acceptedDate);

    @Query("select a from AccompanyMemberWithdraw a" +
            "join fetch a.accompany join fetch a.member" +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndMemberSeq(final Long accompanySeq, final Long memberSeq);
}
