import React, { useState } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, TextInput } from 'react-native'
import tw from "twrnc"
import { TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil'
import { createAccountState } from '../../recoil/user/createAccountAtom'

function AccountName() {
  const [accountName, setAccountName] = useState<string>("");
  const [newAccount, setNewAccount] = useRecoilState(createAccountState)

  const handleName = () => {
    setNewAccount((prevNewAccount) => ({
      ...prevNewAccount,
      name : accountName
    }));
  }
  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>Step 2 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>동행통장의 이름을 입력해주세요.</Text>
      </View>

      <TextInput
              style={tw`self-center mt-15 bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="20자 이내로 입력해주세요"
              placeholderTextColor={"#999"}
              onChangeText={(text) => setAccountName(text)}
            />
      </View>
    </View>
    <TouchableOpacity onPress={handleName}>
      <NextButton action={handleName} router='AccountDuration'></NextButton>
    </TouchableOpacity>
    </>
  )
}

export default AccountName