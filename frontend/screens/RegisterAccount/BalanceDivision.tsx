import React, { useState } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, TextInput } from 'react-native'
import tw from "twrnc"

function AccountDivision() {
  const [accountName, setAccountName] = useState<string>();

  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>4 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>여행비 수금 방법을 선택해주세요</Text>
      </View>

      <TextInput
              style={tw`self-center mt-15 bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="20자 이내로 입력해주세요"
              onChangeText={(text) => setAccountName(text)}
            />
      </View>
    </View>

    <NextButton router='AccountDuration'></NextButton>
    </>
  )
}

export default AccountDivision