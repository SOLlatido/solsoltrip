package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.IndividualWithdraw;

import java.util.List;

public interface IndividualWithdrawRepository extends JpaRepository<IndividualWithdraw, Long> {
    @Query(value = "select a from IndividualWithdraw a" +
            "join fetch a.accompany_member_withdraw" +
            "where a.accompany_member_withdraw.accompanyMemberWithdrawSeq = :accompanyMemberWithdrawSeq",
            nativeQuery = true)
    List<IndividualWithdraw> findByAccompanyMemberWithdrawSeq(final Long accompanyMemberWithdrawSeq);
}
