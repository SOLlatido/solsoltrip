package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "individual_withdraw")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class IndividualWithdraw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long individualWithdrawSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Member member;

    @JoinColumn(name = "accompany_member_withdraw_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private AccompanyMemberWithdraw accompanyMemberWithdraw;

    private Double individual;

    private Boolean isIncluded;

    public void updateIndividualWithdraw(final Double individual, final Boolean isIncluded) {
        this.individual = individual;
        this.isIncluded = isIncluded;
    }
}
