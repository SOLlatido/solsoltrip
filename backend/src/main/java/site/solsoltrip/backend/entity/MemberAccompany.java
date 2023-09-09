package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "member_accompany")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class MemberAccompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberAccompanySeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "accompany_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Accompany accompany;

    private Boolean isManager;

    private Boolean isPaid;

    private Integer settlement;
}
