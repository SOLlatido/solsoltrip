package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "event")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class Event {
    public static final double COORDINATE_TO_METER_UNIT = 60 * 1.1515 * 1609.344;

    public static final int NEARBY_UNIT = 500;
    public static final int ARRIVAL_UNIT = 5;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventSeq;

    private String name;

    private Double x;

    private Double y;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    private List<MemberEvent> memberEventList = new ArrayList<>();
}
