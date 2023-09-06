package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class EventResponseDto {
    @Builder
    public record nearbyInform(List<EventResponseVO> responseVOList) {}

    @Getter
    @Builder
    public static class EventResponseVO {
        private final String name;
        private final short plane;
        private final double ratio;

        EventResponseVO(final String name, final short plane, final double ratio) {
            this.name = name;
            this.plane = plane;
            this.ratio = ratio;
        }
    }
}
