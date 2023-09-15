package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import site.solsoltrip.backend.entity.MemberAccompany;

import java.util.List;
import java.util.Optional;

public interface MemberAccompanyRepository extends JpaRepository<MemberAccompany, Long> {
    @Query("select a from MemberAccompany a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<MemberAccompany> findByAccompanySeq(@Param("accompanySeq") final Long accompanySeq);

    @Query("select a from MemberAccompany a join fetch a.member where a.member.memberSeq = :memberSeq")
    List<MemberAccompany> findByMemberSeq(@Param("memberSeq") final Long memberSeq);

    @Query(value = "select a from MemberAccompany a " +
            "join fetch a.accompany join fetch a.member " +
            "where a.accompany.accompanySeq = :accompanySeq and a.member.memberSeq = :memberSeq",
            nativeQuery = true)
    Optional<MemberAccompany> findByAccompanySeqAndMemberSeq(@Param("accompanySeq") final Long accompanySeq, @Param("memberSeq") final Long memberSeq);
}
