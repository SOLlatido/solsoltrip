package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accompany_content")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class AccompanyContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accompanyContentSeq;

    @JoinColumn(name = "accompany_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Accompany accompany;

    private String store;

    private Integer cost;

    private LocalDate acceptedDate;

    private Integer category;

    private LocalDateTime acceptedDatetime;

    @OneToMany(mappedBy = "accompanyContent", fetch = FetchType.LAZY)
    private List<MemberAccompanyContent> memberAccompanyContentList = new ArrayList<>();
}
