package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;

import java.time.LocalDate;
import java.util.List;

public interface AccompanyMemberWithdrawRepository extends JpaRepository<AccompanyMemberWithdraw, Long> {
    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberWithdraw> findByAccompanySeq(@Param("accompanySeq") final Long accompanySeq);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.category = :category")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndCategory(@Param("accompanySeq") final Long accompanySeq, @Param("category")  final int category);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.acceptedDate = :acceptedDate")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndAcceptedDate(@Param("accompanySeq") final Long accompanySeq, @Param("acceptedDate") final LocalDate acceptedDate);

    @Query(value = "select a from AccompanyMemberWithdraw a " +
            "join fetch a.accompany join fetch a.member " +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq",
            nativeQuery = true)
    List<AccompanyMemberWithdraw> findByAccompanySeqAndMemberSeq(@Param("accompanySeq") final Long accompanySeq, @Param("memberSeq") final Long memberSeq);
}
