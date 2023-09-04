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

    private String id;

    private String password;

    private String name;

    private String phone;

    private Role role;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberEvent> eventList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberAccompany> accompanyList = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<MemberAccompanyContent> accompanyContentList = new ArrayList<>();
}
