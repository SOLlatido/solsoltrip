package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private Member member;

    @JoinColumn(name = "accompany_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Accompany accompany;

    private Boolean isManager;

    private Boolean isPaid;

    private Integer settlement;

    private Integer individualDeposit;

    private Integer individualWithdraw;

    private Boolean isChecked;

    public void updateSettlement(final Integer settlement) {
        this.settlement = settlement;
    }

    public void updateIndividualDeposit(final Integer individualDeposit) {
        this.individualDeposit = individualDeposit;
    }

    public void updateIndividualWithdraw(final Integer individualWithdraw) {
        this.individualWithdraw = individualWithdraw;
    }

    public void updateIsChecked(final Boolean isChecked) {
        this.isChecked = isChecked;
    }
}
