package site.solsoltrip.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "member_accompany_content")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class MemberAccompanyContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberAccompanyContentSeq;

    @JoinColumn(name = "member_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @JoinColumn(name = "accompany_content_seq")
    @ManyToOne(fetch = FetchType.LAZY)
    private AccompanyContent accompanyContent;

    private String memo;

    private String picture;

    private LocalDateTime createdDate;
}
