package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accompany")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class Accompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accompanySeq;

    private String name;

    private String account;

    private LocalDateTime startDatetime;

    private LocalDateTime endDatetime;

    private Integer availableAmount;

    private Integer leftover;

    private String getMethod;

    private Boolean isChecked;

    @OneToMany(mappedBy = "accompany", fetch = FetchType.LAZY)
    private List<AccompanyContent> accompanyContentList = new ArrayList<>();

    @OneToMany(mappedBy = "accompany", fetch = FetchType.LAZY)
    private List<MemberAccompany> memberAccompanyList = new ArrayList<>();
}
