package site.solsoltrip.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    public static final String DEFAULT_PROFILE_IMAGE = "profile/sol_expense_large.png";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;

    private String uuid;

    private String name;

    private String profileImage;

    private int point;

    private String role;

    private String kakaoEmail;

    private String kakaoRefreshToken;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MemberEvent> eventList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<EventPoint> eventPointList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<MemberAccompany> accompanyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<IndividualWithdraw> individualWithdrawList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<RegistedAccount> registedAccountList = new ArrayList<>();

    public void updatePoint(final int point) {
        this.point = point;
    }

    public void updateKakaoEmail(final String kakaoEmail) {
        this.kakaoEmail = kakaoEmail;
    }

    public void updateProfileImage(final String profileImage) {
        this.profileImage = profileImage;
    }

    public void updateKakaoRefreshToken(final String kakaoRefreshToken) {
        this.kakaoRefreshToken = kakaoRefreshToken;
    }
}
