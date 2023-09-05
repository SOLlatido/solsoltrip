package site.solsoltrip.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.solsoltrip.backend.entity.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
}
