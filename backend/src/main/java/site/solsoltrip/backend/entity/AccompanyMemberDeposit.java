package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "accompany_member_deposit")
@NoArgsConstructor
@Getter
@AllArgsConstructor
@Builder
public class AccompanyMemberDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accompanyMemberDepositSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Member member;

    @JoinColumn(name = "accompany_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Accompany accompany;

    private String name;

    private Integer cost;

    private LocalDate acceptedDate;

    private String category;

    private LocalDateTime acceptedDateTime;
}
