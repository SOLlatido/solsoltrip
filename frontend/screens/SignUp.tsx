import React, { useState } from 'react'
import { View, Text, ImageBackground, TextInput} from 'react-native'
import tw from "twrnc";
import LongButton from '../components/ButtonItems/LongButton';
import { StackNavigationProp } from '@react-navigation/stack';
import aurora from '../assets/images/aurora_background.png';
type NavigationProps = {
    navigation: StackNavigationProp<any>;
  };
const SignUp:React.FC<NavigationProps> = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () =>{
    navigation.navigate("Login");
  }

  return (
    <>
    <View style={tw `flex flex-1 bg-white items-center justify-center`}>
      <ImageBackground source={aurora} style={tw `w-full h-full absolute`}></ImageBackground>

      <View style={tw `flex-2 w-full h-full`}>
        <View style={tw `flex-1 w-full items-center`}>
          <View style={tw `flex-1`}></View>

          <View style={tw `flex-1 items-center`}>
          <Text style={tw `text-2xl font-bold mt-5 text-[#222]`}>회원가입</Text>
          <Text style={tw `mt-2`}>회원 등록을 위한 정보를 입력해주세요.</Text>
          </View>

          <View style={tw `flex-2`}>
            <Text style={tw `pl-2 mb-2 text-[#555]`}>이름</Text>
            <TextInput
            
                style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
                placeholder="이름을 입력해주세요"
                onChangeText={(text) => setId(text)}
                value={id}
              />
            <Text style={tw `pl-2 mb-2 text-[#555]`}>아이디</Text>
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="아이디를 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Text style={tw `pl-2 mb-2 text-[#555]`}>비밀번호</Text>
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            {/* <Text style={tw `pl-2 mb-2 text-[#555]`}>휴대폰 번호</Text>
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4`}
              placeholder="휴대폰 번호를 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            /> */}
            
            </View>
        </View>
      </View>

      <LongButton content='회원가입' onPress={handleSignUp}></LongButton>
  
    </View>
    </>
  )
}

export default SignUp