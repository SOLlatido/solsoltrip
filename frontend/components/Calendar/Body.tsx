import { useEffect, useState } from "react";
// import GestureRecognizer from "react-native-swipe-gestures";

// 컴포넌트
import divideArray from "./utils/divideArray";


function Body(props){
    const [totalDays, setTotalDays] = useState([]);
    const [totalDaysByState, setTotalDaysByState] = useState({});
    const [pressedDate, setPressedDate] = useState({
        state: "",
        year: 0,
        month: 0,
        date: 0, 
    });

    const [week, setWeek] = useState(0);
    const [viewTotalDays, setViewTotalDays] = useState(true);

    const {year, month, date} = props; //Calendar 컴포넌트에서 넘겨준 props

    // 기능1:
    const getTotalDays = (year, month) => {
        const previousMonthLastDate = new Date(year, month-1, 0).getDate(); //9월이면 31이 도출
        const previousMonthLastDay = new Date(year, month-1,0).getDay(); //월요일 = 1, 화요일 = 2, 수요일 =3, 목요일 = 4, 금요일 = 5, 토요일 6, 일요일 7

        const currentMonthLastDate = new Date(year, month, 0).getDate();
        const currentMonthLastDay = new Date(year, month, 0).getDay();

        // 기능 1-1 : 이전 달의 월요일부터 다음달 시작 요일까지 출력
        const previousDays = Array.from(
            // 만약  previousMonthLastDay = 4 (목)
            // previousMonthLastDate = 31
            // previousDays = [27, 28, 29, 30, 31]
            {length: previousMonthLastDay + 1},
            (v,i) => previousMonthLastDate - previousMonthLastDay + i
        );

        const currentDays = Array.from(
            // 만약  currentMonthLastDate = 30
            //  1~30가 들어가겠다.
            {length: currentMonthLastDate},
            (v,i) => i+1
        );

        const nextDays = Array.from(
            {length: 6 - currentMonthLastDate},
            (v,i) => i+1
        );


        setTotalDays(
            divideArray([...previousDays, ...currentDays, ...nextDays], 7)
        );

        setTotalDaysByState({
            prev: {
              daysList: previousMonthLastDay !== 6 ? previousDays : [],
              year: month === 1 ? year - 1 : year,
              month: month === 1 ? 12 : month - 1,
            },
            curr: { daysList: currentDays, year: year, month: month },
            next: {
              daysList: nextDays,
              year: month === 12 ? year + 1 : year,
              month: month === 12 ? 1 : month + 1,
            },
          });
    } 

    // 이전이나 다음을 눌렀을 경우 년도와 월을 바꾼다.
    const handlePressDay = (pressedDate) => {
        setPressedDate(pressedDate);
        if(pressedDate.state==="prev" || pressedDate.state === "next"){
            props.moveToSpecificYearAndMonth(pressedDate.year, pressedDate.month);
        }
    }

    const onSwipeLeft = (gestureState) => {
        if (viewTotalDays === true) {
          props.moveToNextMonth(month);
        }
        if (viewTotalDays === false) {
          if (totalDays[week + 1] === undefined) {
            props.moveToNextMonth(month);
            setWeek(0);
          } else {
            setWeek(week + 1);
          }
        }
      };
      const onSwipeRight = (gestureState) => {
        if (viewTotalDays === true) {
          props.moveToPreviousMonth(month);
        }
        if (viewTotalDays === false) {
          if (totalDays[week - 1] === undefined) {
            props.moveToPreviousMonth(month);
            if (
              new Date(year, month - 1, 0).getDay() === 4 ||
              new Date(year, month - 1, 0).getDay() === 5
            ) {
              setWeek(5);
            } else {
              setWeek(4);
            }
          } else {
            setWeek(week - 1);
          }
        }
      };
      const onSwipeUp = () => {
        setViewTotalDays(false);
      };
      const onSwipeDown = () => {
        setViewTotalDays(true);
      };

      return (
        <GestureRecognizer
          onSwipeUp={onSwipeUp}
          onSwipeDown={onSwipeDown}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={{ velocityThreshold: 0.1 }}
        >
          <View style={S.dayOfWeek}>
            {dayOfWeek.map((day, idx) => (
              <View style={S.box} key={idx}>
                <Text style={changeColorByDay(day).dayOfWeek}>{day}</Text>
              </View>
            ))}
          </View>
          <View>
            {viewTotalDays ? (
              <View style={S.totalDays}>
                {Object.keys(totalDaysByState).map((state) =>
                  totalDaysByState[state].daysList.map((day) => {
                    const checkPressedDate = {
                      state: state,
                      year: totalDaysByState[state].year,
                      month: totalDaysByState[state].month,
                      date: day,
                    };
                    return (
                      <View style={S.box} key={uuidv4()}>
                        <Pressable
                          onPress={handlePressDay.bind(this, checkPressedDate)}
                          style={({ pressed }) => {
                            return [
                              pressedDate.date === checkPressedDate.date &&
                              pressedDate.month === checkPressedDate.month &&
                              pressedDate.year === checkPressedDate.year
                                ? S.pressedDate
                                : null,
                              pressed && S.pressed,
                            ];
                          }}
                        >
                          <Text
                            style={[
                              [
                                isSameObj(
                                  { state: "curr", ...props.today },
                                  checkPressedDate
                                )
                                  ? S.today
                                  : state === "prev" || state === "next"
                                  ? S.prev
                                  : S.curr,
                              ],
                            ]}
                          >
                            {day}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })
                )}
              </View>
            ) : (
              <View style={{ width: "100%", flexDirection: "row" }}>
                {totalDays[week]?.map((el, idx) => {
                  const checkPressedDate = {
                    year: year,
                    month: month,
                    date: el,
                  };
                  return (
                    <View style={S.box} key={idx}>
                      <Pressable
                        onPress={handlePressDay.bind(this, checkPressedDate)}
                        style={({ pressed }) => {
                          return [
                            pressedDate.date === checkPressedDate.date &&
                            pressedDate.month === checkPressedDate.month &&
                            pressedDate.year === checkPressedDate.year
                              ? S.pressedDate
                              : null,
                            pressed && S.pressed,
                          ];
                        }}
                      >
                        <Text
                          style={[
                            [
                              isSameObj({ ...props.today }, checkPressedDate)
                                ? S.today
                                : S.curr,
                            ],
                          ]}
                        >
                          {el}
                        </Text>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </GestureRecognizer>
      );

    
}

export default Body