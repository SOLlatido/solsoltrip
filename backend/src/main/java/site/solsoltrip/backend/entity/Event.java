package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    public static final int NEARBY_UNIT = 2000;
    public static final int ARRIVAL_UNIT = 300;

    public static final int FIRST_SECTION_PERCENTAGE = 60;
    public static final int SECOND_SECTION_PERCENTAGE = 90;
    public static final int THIRD_SECTION_PERCENTAGE = 97;
    public static final int FOURTH_SECTION_PERCENTAGE = 99;
    public static final int FIFTH_SECTION_PERCENTAGE = 100;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventSeq;

    private String name;

    private String description;

    private Double x;

    private Double y;

    @OneToMany(mappedBy = "event", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MemberEvent> memberEventList = new ArrayList<>();
}
