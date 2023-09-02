package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventSeq;

    private String name;

    private String region;

    private Double x;

    private Double y;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    private List<MemberEvent> memberEventList = new ArrayList<>();
}