package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "event_point")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class EventPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventPointSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    private String name;

    private Integer point;

    private LocalDateTime acceptedDateTime;
}
