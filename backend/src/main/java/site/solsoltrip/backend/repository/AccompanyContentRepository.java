package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.AccompanyContent;

import java.time.LocalDate;
import java.util.List;

public interface AccompanyContentRepository extends JpaRepository<AccompanyContent, Long> {
    @Query("select a from AccompanyContent a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.category = :category")
    List<AccompanyContent> findByAccompanySeqAndCategory(final Long accompanySeq, final int category);

    @Query("select a from AccompanyContent a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq and a.acceptedDate = :acceptedDate")
    List<AccompanyContent> findByAccompanySeqAndAcceptedDate(final Long accompanySeq, final LocalDate acceptedDate);
}
