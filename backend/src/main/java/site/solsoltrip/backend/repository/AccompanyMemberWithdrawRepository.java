package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;

import java.util.List;

public interface AccompanyMemberWithdrawRepository extends JpaRepository<AccompanyMemberWithdraw, Long> {
    @Query("select a from AccompanyMemberWithdraw a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<AccompanyMemberWithdraw> findByAccompanySeq(final Long accompanySeq);
}
