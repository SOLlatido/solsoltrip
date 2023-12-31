package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
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

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer individual;

    private Integer totalDeposit;

    private Integer totalWithdraw;

    @OneToMany(mappedBy = "accompany", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MemberAccompany> memberAccompanyList = new ArrayList<>();

    @OneToMany(mappedBy = "accompany", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<AccompanyMemberDeposit> accompanyMemberDepositList = new ArrayList<>();

    @OneToMany(mappedBy = "accompany", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<AccompanyMemberWithdraw> accompanyMemberWithdrawList = new ArrayList<>();

    public void updateEndDate(final LocalDate endDate) {
        this.endDate = endDate;
    }

    public void updateTotalWithdraw(final Integer totalWithdraw) {
        this.totalWithdraw = totalWithdraw;
    }

    public void updateTotalDeposit(final Integer totalDeposit) {
        this.totalDeposit = totalDeposit;
    }
}
