package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccompanyMemberWithdrawRepository extends JpaRepository<AccompanyMemberWithdraw, Long> {
    Optional<AccompanyMemberWithdraw> findByAccompanyMemberWithdrawSeq(final Long accompanyMemberWithdrawSeq);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberWithdraw> findByAccompanySeq(@Param("accompanySeq") final Long accompanySeq);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq order by a.accompanyMemberWithdrawSeq desc")
    List<AccompanyMemberWithdraw> findByAccompanySeqOrderByAccompanyMemberWithdrawSeqDesc(@Param("accompanySeq") final Long accompanySeq);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.category = :category")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndCategory(@Param("accompanySeq") final Long accompanySeq, @Param("category")  final String category);

    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.acceptedDate = :acceptedDate")
    List<AccompanyMemberWithdraw> findByAccompanySeqAndAcceptedDate(@Param("accompanySeq") final Long accompanySeq, @Param("acceptedDate") final LocalDate acceptedDate);
}
