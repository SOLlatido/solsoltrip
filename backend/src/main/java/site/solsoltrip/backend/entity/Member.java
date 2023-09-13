package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    private String uuid;

    private String name;

    private int point;

    private String role;

    private String kakaoEmail;

    private String kakaoRefreshToken;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberEvent> eventList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<EventPoint> eventPointList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberAccompany> accompanyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<IndividualWithdraw> individualWithdrawList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<RegistedAccount> registedAccountList = new ArrayList<>();

    public void updatePoint(final int point) {
        this.point = point;
    }

    public void updateKakaoEmail(final String kakaoEmail) {
        this.kakaoEmail = kakaoEmail;
    }

    public void updateKakaoRefreshToken(final String kakaoRefreshToken) {
        this.kakaoRefreshToken = kakaoRefreshToken;
    }
}
