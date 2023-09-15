package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.Accompany;

import java.util.Optional;

public interface AccompanyRepository extends JpaRepository<Accompany, Long> {
    Optional<Accompany> findByAccompanySeq(final Long accompanySeq);

    Optional<Accompany> findByNameAndAccount(final String name, String account);
}
