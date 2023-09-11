import React, { useState } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import { Octicons } from '@expo/vector-icons';
import tw from "twrnc"

function AccountDivision() {
  const [plannedExpense, setPlannedExpense] = useState<string>();
  const [myExpense, setMyExpense] = useState<string>();
  const balanceLeft = "320,000";
   
  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>Step 4 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>여행비 관리 정보를 선택해주세요</Text>
      </View>

        <View style={tw `mt-8 self-center`}>
          {/* 입력칸 */}
          <View style={tw `flex-2 p-9`}>
            <Text style={tw `mb-2 text-[#555] text-base`}>예상 지출금액이 얼마인가요?(인당)</Text>
            <View style={tw `flex-row self-center`}>
            <TextInput
                keyboardType='numeric'
                returnKeyType='done'
                style={tw`bg-white rounded-lg w-full h-12 px-4 mb-0`}
                placeholder="지출 예정 금액 (단위: 원)"
                placeholderTextColor={"#999"}
                onChangeText={(text) => setPlannedExpense(text)}
              >
              </TextInput>
                {/* <Octicons style={tw `ml-2 self-center`} name="question" size={24} color="#7EBBBB" /> */}
            </View>
            {/* <Text style={tw `mt-5 pl-4 mb-2 text-[#555] text-base`}>출금 불가 금액</Text>
            <View style={tw `flex-row self-center`}>
            <TextInput
                keyboardType='numeric'
                returnKeyType='done'
                style={tw`bg-white rounded-lg w-5/6 h-12 px-4 mb-0`}
                placeholder="출금 불가한 최소금액을 알려주세요"
                placeholderTextColor={"#999"}
                onChangeText={(text) => setPlannedExpense(text)}
              />
                <Octicons style={tw `ml-2 self-center`} name="question" size={24} color="#7EBBBB" />
            </View> */}
            <Text style={tw `mt-10 text-right mb-0 text-[#333] font-bold`}>현재 계좌 잔액</Text>
            <Text style={tw `text-right pl-2 mb-2 text-[#333] font-bold text-lg`}>₩ {balanceLeft}</Text>
            

          {/* 설명란 */}
        <View style={tw `w-full self-center bg-[#C4D6D6]/60 rounded-[4] mt-4 p-5`}>
          <Text style={tw `font-bold mb-2 text-[#555] `}>Tip!</Text>
          <Text style={tw `text-[#555] pb-2`}>각 동행이 동행통장에 기여할 금액을 입력해주세요. 해당 금액은 추후 '정산하기' 기능에서 활용됩니다.</Text>
        </View>

        </View>
     
      </View>
    </View>
    </View>
    <TouchableOpacity onPress={()=>{Alert.alert("동행통장 생성이 완료되었습니다. 동행 초대 페이지로 이동합니다.")}}><NextButton router='InviteFriends'></NextButton></TouchableOpacity>
    
    </>
  )
}

export default AccountDivision