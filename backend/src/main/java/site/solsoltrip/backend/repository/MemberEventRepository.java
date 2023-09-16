package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.MemberEvent;

import java.util.Optional;

@Repository
public interface MemberEventRepository extends JpaRepository<MemberEvent, Long> {
    @Query("select a from MemberEvent a join fetch a.member where a.member.memberSeq = :memberSeq and a.event.eventSeq = :eventSeq")
    Optional<MemberEvent> findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(@Param("memberSeq") final Long memberSeq, @Param("eventSeq") Long eventSeq);
}
