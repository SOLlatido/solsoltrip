import React, { useState } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, TouchableOpacity, TextInput, Pressable} from 'react-native'
import tw from "twrnc"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
function AccountDuration() {
    const [startText, setStartText] = useState<string>("시작 날짜")
    const [endText, setEndText] = useState<string>("종료 날짜")
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [stage, setStage] = useState<number>(0);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //체크 로직
    // 종료날짜가 시작날짜보다 뒤에 있어야 함
    // 현재 날짜보다 시작날짜가 먼저 있으면 안됨?
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date:Date) => {
        if(stage === 0){
            setStartDate(date);
            setStartText(String(date.toISOString().slice(0,10)));
        } else {
            setEndDate(date);
            setEndText(String(date.toISOString().slice(0,10)));

        }
        hideDatePicker();
        console.log(date);
    };
  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>Step 3 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>여행 시작날짜, 종료날짜를 입력해주세요</Text>
      </View>

      <View style={tw `flex flex-row w-5/6 self-center items-center mt-15`}>

      <Pressable style={[tw `flex-1 self-center items-center`]} onPress={()=>{showDatePicker(); setStage(0)}}>
        <Text style={tw `text-[#555] p-3 text-center bg-white w-6/7 h-10`}>
            {startText}
        </Text>
      </Pressable>

      <MaterialCommunityIcons name="train-car-passenger" size={24} color="#51C0C7" />
      <TouchableOpacity style={tw `flex-1 rounded-lg items-center`} onPress={()=>{showDatePicker(); setStage(1)}}>
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
    </View>

    <NextButton router='BalanceDivision'></NextButton>
    </>
  )
}

export default AccountDuration