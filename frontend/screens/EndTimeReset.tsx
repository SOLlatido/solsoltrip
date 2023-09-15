import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, Dimensions, Alert} from 'react-native'
import tw from "twrnc"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native'
import { nonAuthHttp, authHttp } from '../axios/axios';

// recoil
import { useRecoilState } from 'recoil';
import {currentAccountState} from "../recoil/account/currentAccountAtom"

type EndTimeResetProps = {
    navigation: StackNavigationProp<any>;
};

const EndTimeReset: React.FC = ()=>{

    //오늘의 날짜 설정
    const now = new Date();
    let nowYear:string = String(now.getFullYear());
    let nowMonth:string = String(now.getMonth()+1);
    let nowDate:string = String(now.getDate());

    if(Number(nowMonth)<10){
        nowMonth = `0${nowMonth}`;
    }
    if(Number(nowDate)<10){
        nowDate = `0${nowDate}`;
    }

    const currAccount = useRecoilState(currentAccountState);
    const accompanySeq:number|null = currAccount[0].accompanySeq;

    const navigation = useNavigation();
    const [startText, setStartText] = useState<string>(`${nowYear}-${nowMonth}-${nowDate}`)
    const [endText, setEndText] = useState<string>("종료 날짜")
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const height = Dimensions.get("window").height;


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date:Date) => {

        let flag:boolean = true;

        const start_year:number = parseInt(startText.slice(0,4));
        const start_month:number = parseInt(startText.slice(5,7));
        const start_day:number = parseInt(startText.slice(8,10));

        
        
        // 년도가 크거나 같냐
        if(start_year<=parseInt(date.toISOString().slice(0,4))){
            //월이 크거나 같냐
            if(start_month<=parseInt(date.toISOString().slice(5,7))){
                //일이 크거나 같냐
                if(start_day<=parseInt(date.toISOString().slice(8,10))){
                    setEndDate(date);
                    setEndText(String(date.toISOString().slice(0,10)));
                }else flag = false;
            }else flag = false;
        }else flag = false;

        if(!flag){
            alert("시작 날짜보다 이전 날짜는\n선택하실 수 없습니다.");
        }

        hideDatePicker();
    };

    //종료시간 재설정 axios
    async function setTripEndDate(data:endTimeResetRequest): Promise<void> {
        try {

            const response = await nonAuthHttp.patch(`api/settlement/reset`, data);
            
            if(response.status===200){
                Alert.alert("종료날짜를 재설정하였습니다.")
            }else{
                return;
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            console.log(error);
        }
    }


    return(
        <View style={tw `flex-1 bg-[#DBE4E4]`}>
            <View style={tw `mt-30`}>
                <View>
                    <Text style={tw `text-lg self-center mt-5`}>종료날짜를 선택해주세요</Text>
                </View>

                <View style={tw `flex flex-row w-5/6 self-center items-center mt-15`}>

                    <Pressable style={[tw `flex-1 self-center items-center`]} onPress={()=>{alert(`시작 날짜는 변경하실 수 없습니다.\n통행 통장 시작 날짜입니다.`);}}>
                        <Text style={tw `text-[#555] p-3 text-center bg-white w-6/7 h-10`}>
                            {startText}
                        </Text>
                    </Pressable>

                    <MaterialCommunityIcons name="train-car-passenger" size={24} color="#51C0C7" />
                    <TouchableOpacity style={tw `flex-1 rounded-lg items-center`} onPress={()=>{showDatePicker()}}>
                        <Text style={tw `text-[#555] p-3 text-center bg-white w-6/7 h-10`}>
                            {endText}
                        </Text>
                    </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                            date={selectedDate}
                            display='inline'
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[
                        tw`mt-[${height-400}] w-5/7 bg-[#51C0C7]/90 h-12 rounded-[4] justify-center self-center items-center`,
                    ]}
                    onPress={()=>{navigation.navigate("MyAccounts")}}
                >
                    <Text onPress={()=>{setTripEndDate({
                        accompanySeq: accompanySeq,
                        endDate: endText
                    })}} style={tw `text-white text-base font-semibold`}>수정하기</Text>
                </TouchableOpacity>
            

            {/* 일반 달력 실물버전 입니다. */}
            {/* <View style={tw `flex-1 justify-center items-center mt-30`}>
                
                <Text style={tw `text-sm text-neutral-500`}>종료 날짜는 오늘 날짜부터 선택하실 수 있어요</Text>
                
                <View style={tw`justify-center mt-3 items-center bg-white rounded-lg w-70 h-12`}>
                    <Text style={tw`bg-white rounded-lg text-center text-lg`}>
                        {endDate}
                    </Text>
                </View>
        
            </View>


            <View style={tw `flex-4 mt-3`}>
                <Calendar/>
            </View>
            
            <View style={tw `flex-1 flex-row`}>
                <LongButton content='수정하기'/>
            </View> */}

        </View>
    )

}


export default EndTimeReset

type endTimeResetRequest = {
    accompanySeq : number|null,
    endDate : string
}