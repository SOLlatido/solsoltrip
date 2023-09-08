package site.solsoltrip.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class EventResponseDto {
    @Builder
    public record nearbyOrArrivalInform(
            @NotNull
            boolean isArrived,

            List<EventResponseVO> responseVOList
    ) {}

    @Getter
    @Builder
    public static class EventResponseVO {
        private final String name;
        private final double dist;

        EventResponseVO(final String name, final double dist) {
            this.name = name;
            this.dist = dist;
        }
    }
}
