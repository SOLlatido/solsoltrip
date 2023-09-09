package site.solsoltrip.backend.entity;

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

    private String type;

    private String account;

    private String name;

    private Integer balance;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
}