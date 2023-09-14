package site.solsoltrip.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class EventResponseDto {
    @Builder
    public record inform(List<TotalEventResponseVO> totalResponseVOList,
                                        List<EventResponseVO> responseVOList,
                                        Boolean isArrived,
                                        Integer point) {}

    @Builder
    public record myPointList(Integer myPoint, List<PointVO> pointVOList) {}

    @Getter
    @Builder
    public static class TotalEventResponseVO {
        private final String name;
        private final String description;
        private final Double x;
        private final Double y;

        TotalEventResponseVO(final String name, final String description, final Double x, final Double y) {
            this.name = name;
            this.description = description;
            this.x = x;
            this.y = y;
        }
    }

    @Getter
    @Builder
    public static class EventResponseVO {
        private final String name;

        EventResponseVO(final String name) {
            this.name = name;
        }
    }

    @Getter
    @Builder
    public static class PointVO {
        private final String name;
        private final Integer point;
        private final LocalDateTime acceptedDate;

        PointVO(final String name, final Integer point, final LocalDateTime acceptedDate) {
            this.name = name;
            this.point = point;
            this.acceptedDate = acceptedDate;
        }
    }
}
