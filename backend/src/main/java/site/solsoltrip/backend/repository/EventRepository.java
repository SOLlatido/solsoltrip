package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.Event;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByRegion(final String region);

    Optional<Event> findByXAndY(final double x, final double y);
}
