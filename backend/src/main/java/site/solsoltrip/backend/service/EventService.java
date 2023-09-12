package site.solsoltrip.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.solsoltrip.backend.dto.EventRequestDto;
import site.solsoltrip.backend.dto.EventResponseDto;
import site.solsoltrip.backend.entity.Event;
import site.solsoltrip.backend.entity.EventPoint;
import site.solsoltrip.backend.entity.Member;
import site.solsoltrip.backend.entity.MemberEvent;
import site.solsoltrip.backend.repository.EventPointRepository;
import site.solsoltrip.backend.repository.EventRepository;
import site.solsoltrip.backend.repository.MemberEventRepository;
import site.solsoltrip.backend.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventRepository eventRepository;
    private final EventPointRepository eventPointRepository;
    private final MemberRepository memberRepository;
    private final MemberEventRepository memberEventRepository;

    @Transactional
    public void registEvent(final EventRequestDto.registEvent requestDto) {
        if (eventRepository.findByXAndY(requestDto.x(), requestDto.y()).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 이벤트 지역입니다.");
        }

        final Event event = Event.builder()
                .name(requestDto.name())
                .description(requestDto.description())
                .x(requestDto.x())
                .y(requestDto.y())
                .build();

        eventRepository.save(event);
    }

    @Transactional
    public EventResponseDto.nearbyOrArrivalInform nearbyOrArrivalInform(final EventRequestDto.nearbyOrArrivalInform requestDto) {
        final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final List<Event> eventList = eventRepository.findAll();

        if (eventList.isEmpty()) {
            return null;
        }

        final List<EventResponseDto.TotalEventResponseVO> totalResponseVOList = new ArrayList<>();
        final List<EventResponseDto.EventResponseVO> responseVOList = new ArrayList<>();

        boolean isArrived = false;
        int eventPoint = 0;

        for (final Event event : eventList) {
            final MemberEvent memberEvent = memberEventRepository
                    .findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(requestDto.memberSeq(), event.getEventSeq())
                    .orElseGet(() -> memberEventRepository.save(MemberEvent.builder()
                                    .event(event)
                                    .member(member)
                                    .isDone(false)
                            .build())
            );

            if (memberEvent.getIsDone()) {
                continue;
            }

            final double dist = coordinateToMeter(event.getX(), event.getY(), requestDto.x(), requestDto.y());

            if (dist < Event.ARRIVAL_UNIT) {
                eventPoint = arrivalInform(requestDto.memberSeq(), event.getEventSeq());
                isArrived = true;
                continue;
            }

            final EventResponseDto.TotalEventResponseVO totalResponseVO = EventResponseDto.TotalEventResponseVO.builder()
                    .name(event.getName())
                    .description(event.getDescription())
                    .x(event.getX())
                    .y(event.getY())
                    .build();

            totalResponseVOList.add(totalResponseVO);

            if (dist > Event.NEARBY_UNIT) {
                continue;
            }

            final EventResponseDto.EventResponseVO responseVO = EventResponseDto.EventResponseVO.builder()
                    .name(event.getName())
                    .build();

            responseVOList.add(responseVO);
        }

        return EventResponseDto.nearbyOrArrivalInform.builder()
                .totalResponseVOList(totalResponseVOList)
                .responseVOList(responseVOList)
                .isArrived(isArrived)
                .point(eventPoint)
                .build();
    }

    public EventResponseDto.myPointList myPointList(final EventRequestDto.myPointList requestDto) {
        final Member member = memberRepository.findByMemberSeq(requestDto.memberSeq()).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final int myPoint = member.getPoint();

        final List<EventPoint> eventPointList = eventPointRepository.findByMemberSeq(requestDto.memberSeq());

        final List<EventResponseDto.PointVO> pointVOList = new ArrayList<>();

        for (final EventPoint eventPoint : eventPointList) {
            final EventResponseDto.PointVO pointVO = EventResponseDto.PointVO.builder()
                    .name(eventPoint.getName())
                    .point(eventPoint.getPoint())
                    .acceptedDate(eventPoint.getAcceptedDate())
                    .build();

            pointVOList.add(pointVO);
        }

        return EventResponseDto.myPointList.builder()
                .myPoint(myPoint)
                .pointVOList(pointVOList)
                .build();
    }

    @Transactional
    private int arrivalInform(final Long memberSeq, final Long eventSeq) {
        final MemberEvent memberEvent = memberEventRepository
                .findByMemberSeqAndEventSeqJoinFetchMemberAndEvent(memberSeq, eventSeq)
                .orElseThrow(() -> new IllegalArgumentException("찾은 멤버 및 이벤트와 매칭되는 정보가 없습니다."));

        memberEvent.updateIsDone(true);

        final Member member = memberRepository.findByMemberSeq(memberSeq).orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 유저입니다.")
        );

        final int myPoint = member.getPoint();

        final int eventPoint = generatePoint();

        final Event event = eventRepository.findByEventSeq(eventSeq).orElseThrow(
                () -> new IllegalArgumentException("해당하는 이벤트가 없습니다.")
        );

        final EventPoint eventPointLog = EventPoint.builder()
                .member(member)
                .name(event.getName())
                .point(eventPoint)
                .acceptedDate(LocalDateTime.now())
                .build();

        eventPointRepository.save(eventPointLog);

        member.updatePoint(myPoint + eventPoint);

        return eventPoint;
    }

    private static double coordinateToMeter(final double eventX, final double eventY, final double curX, final double curY) {
        final double theta = eventY - curY;

        double dist = Math.sin(deg2rad(eventX)) * Math.sin(deg2rad(curX)) +
                Math.cos(deg2rad(eventX)) * Math.cos(deg2rad(curX)) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);

        dist = rad2deg(dist);

        return dist * Event.COORDINATE_TO_METER_UNIT;
    }

    private static double deg2rad(final double deg){
        return (deg * Math.PI / 180);
    }

    private static double rad2deg(final double rad){
        return (rad * 180 / Math.PI);
    }

    private static int generatePoint() {
        int point = 0;

        final Random random = new Random();

        final double percentage = (Math.random() * 100) + 1;

        if (0 < percentage && percentage < Event.FIRST_SECTION_PERCENTAGE) {
            point = random.nextInt(9) + 1;
        } else if (Event.FIRST_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.SECOND_SECTION_PERCENTAGE) {
            point = random.nextInt(10) + 10;
        } else if (Event.SECOND_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.THIRD_SECTION_PERCENTAGE) {
            point = random.nextInt(30) + 20;
        } else if (Event.THIRD_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.FOURTH_SECTION_PERCENTAGE) {
            point = random.nextInt(50) + 50;
        } else if (Event.FOURTH_SECTION_PERCENTAGE <= percentage &&
                percentage < Event.FIFTH_SECTION_PERCENTAGE) {
            point = random.nextInt(901) + 100;
        }

        return point;
    }
}
