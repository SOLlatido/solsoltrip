package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.EventPoint;

import java.util.List;

@Repository
public interface EventPointRepository extends JpaRepository<EventPoint, Long> {
    @Query("select a from EventPoint a join fetch a.member where a.member.memberSeq = :memberSeq")
    List<EventPoint> findByMemberSeq(@Param("memberSeq") final Long memberSeq);
}
