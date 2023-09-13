package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "individual_withdraw")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class IndividualWithdraw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long individualWithdrawSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "accompany_member_withdraw_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private AccompanyMemberWithdraw accompanyMemberWithdraw;

    private Double individual;
}
