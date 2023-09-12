package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import site.solsoltrip.backend.entity.MemberAccompany;

import java.util.List;

public interface MemberAccompanyRepository extends JpaRepository<MemberAccompany, Long> {
    @Query("select a from MemberAccompany a join fetch a.accompany where a.accompany.accompanySeq = :accompanySeq")
    List<MemberAccompany> findByAccompanySeq(final Long accompanySeq);
}
