package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accompany_member_withdraw")
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class AccompanyMemberWithdraw {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accompanyWithdrawSeq;

    @JoinColumn(name = "accompany_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Accompany accompany;

    private String store;

    private Integer cost;

    private LocalDate acceptedDate;

    private String category;

    private LocalDateTime acceptedDateTime;

    private String memo;

    private String picture;

    private LocalDateTime memoDateTime;

    @OneToMany(mappedBy = "individualWithdraw", fetch = FetchType.LAZY)
    private List<IndividualWithdraw> individualWithdrawList = new ArrayList<>();
}
