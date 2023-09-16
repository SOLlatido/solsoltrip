package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.solsoltrip.backend.entity.Accompany;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccompanyRepository extends JpaRepository<Accompany, Long> {
    Optional<Accompany> findByAccompanySeq(final Long accompanySeq);

    List<Accompany> findByAccount(final String account);
}
