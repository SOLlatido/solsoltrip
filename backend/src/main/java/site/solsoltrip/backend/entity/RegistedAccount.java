package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "registed_account")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class RegistedAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registedAccountSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Member member;

    private String type;

    private String account;

    private String name;

    private Integer balance;

    private Boolean isAccompanyAccount;

    public void updateIsAccompanyAccount(final Boolean isAccompanyAccount) {
        this.isAccompanyAccount = isAccompanyAccount;
    }
}