package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.MemberAccompany;

import java.util.List;
import java.util.Optional;

public interface MemberAccompanyRepository extends JpaRepository<MemberAccompany, Long> {
    @Query("select a from MemberAccompany a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<MemberAccompany> findByAccompanySeq(final Long accompanySeq);

    @Query("select a from MemberAccompany a" +
            "join fetch a.accompany join fetch a.member" +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq")
    Optional<MemberAccompany> findByAccompanySeqAndMemberSeq(final Long accompanySeq, final Long memberSeq);
}
