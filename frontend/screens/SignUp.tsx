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
      <ImageBackground source={aurora} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>

      <View style={tw `flex-2 w-full h-full`}>
        <View style={tw `flex-1 w-full items-center`}>
          <View style={tw `flex-1`}></View>
          <Text style={tw `flex-1 text-2xl mt-5 text-[#222]`}>회원가입</Text>

          <View style={tw `flex-2 items-center`}>
          <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="이름을 입력해주세요"
              onChangeText={(text) => setId(text)}
              value={id}
            />
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="아이디를 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4 mb-4`}
              placeholder="비밀번호를 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TextInput
              style={tw`bg-white rounded-lg w-80 h-12 px-4`}
              placeholder="이메일을 입력해주세요"
              secureTextEntry={true} // This hides the input as it's a password
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            
            </View>
        </View>
      </View>

      <LongButton content='회원가입' onPress={handleSignUp}></LongButton>
  
    </View>
    </>
  )
}

export default SignUp