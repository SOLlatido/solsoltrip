import React, { useState, useEffect } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, TouchableOpacity, Pressable} from 'react-native'
import tw from "twrnc"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil'
import { createAccountState } from '../../recoil/user/createAccountAtom'
function AccountDuration() {
    const [startText, setStartText] = useState<string>(new Date().toISOString().slice(0,10))
    const [endText, setEndText] = useState<string>("종료 날짜")
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [newAccount, setNewAccount] = useRecoilState(createAccountState)

    const handleDate = () => {
      setNewAccount((prevNewAccount) => ({
        ...prevNewAccount,
        startDate : startText,
        endDate : endText,
      }));
    }
    useEffect(() => {
      console.log(newAccount);
    }, [newAccount]);

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


  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>Step 3 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>여행 시작날짜, 종료날짜를 입력해주세요</Text>
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
    </View>

    <NextButton action={handleDate} router='BalanceDivision'></NextButton>
    </>
  )
}

export default AccountDuration