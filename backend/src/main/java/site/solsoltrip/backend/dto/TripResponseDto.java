package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;
import site.solsoltrip.backend.entity.AccompanyMemberDeposit;
import site.solsoltrip.backend.entity.AccompanyMemberWithdraw;

import java.time.LocalDate;
import java.util.List;

public class TripResponseDto {
    @Builder
    public record validation(List<TripResponseVO> responseVOList) {}

    @Builder
    public record tripDetail(
            String account,

            String name,

            Integer size,

            LocalDate startDate,

            LocalDate endDate,

            Integer peopleNum,

            List<AccompanyMemberDeposit> depositList,

            List<AccompanyMemberWithdraw> withdrawList,

            List<Object> totalList
    ) {}

    @Builder
    public record totalMember(List<TotalMemberVO> totalMemberList) {}

    @Builder
    public record check(Boolean endTrip) {}

    @Getter
    @Builder
    public static class TripResponseVO {
        private final Long registedAccountSeq;
        private final String account;
        private final String name;
        private final String balance;
    }

    @Getter
    @Builder
    public static class TotalMemberVO {
        private final String name;
        private final Boolean isMe;
        private final String formattedWithdraw;
    }
}