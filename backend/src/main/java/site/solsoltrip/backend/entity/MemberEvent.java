package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "member_event")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class MemberEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberEventSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Member member;

    @JoinColumn(name = "event_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Event event;

    private Boolean isDone;

    public void updateIsDone(final Boolean isDone) {
        this.isDone = isDone;
    }
}
