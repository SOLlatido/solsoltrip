import { useState } from "react";
import { View } from "react-native";
import tw from 'twrnc'; 

// 컴포넌트
import Body from "./Body";
import Header from "./Header";

function Calendar(){
    
    const DATE = new Date();

    const YEAR = DATE.getFullYear();
    const MONTH = DATE.getMonth() + 1;
    const DAY = DATE.getDate();
    
    const today = {year: YEAR, month: MONTH, date: DAY};

    const [year, setYear] = useState(YEAR);
    const [month, setMonth] = useState(MONTH);
    const [date, setDate] = useState(DAY);

    // 기능1 : 다음 월 이동
    const moveToNextMonth = (month) => {
        if(month === 12){
            // 12월에서 다음을 누를 경우 1월로 이동시킨다.
            setYear((previousYear)=>previousYear+1);
            setMonth(1);
        }

        else{
            setMonth((previousMonth)=>previousMonth+1);
        }
    };

    // 기능2 : 이전 월 이동
    const moveToPrevioustMonth = (month) => {
        if(month === 1){
            // 1월에서 이전을 누를 경우 12월로 이동시킨다.
            setYear((previousYear)=>previousYear-1);
            setMonth(12);
        }

        else{
            setMonth((previousMonth)=>previousMonth-1);
        }
    };

    //기능3 : 특정 년도와 월을 클릭할 경우 그곳으로 이동
    const moveToSpecificYearAndMonth = (year, month) => {
        setYear(year);
        setMonth(month);
    };


    return(
        <View style={tw `w-full`}>
            <Header
                month={month}
                year={year}
                moveToNextMonth={moveToNextMonth}
                moveToPreviousMonth={moveToPrevioustMonth}
                moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
            />

            <Body
                year={year}
                month={month}
                moveToNextMonth = {moveToNextMonth}
                moveToPreviousMonth = {moveToPrevioustMonth}
                moveToSpecificYearAndMonth = {moveToSpecificYearAndMonth}
            />

        </View>
    )
}

export default Calendar