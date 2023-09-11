import React, { useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import tw from 'twrnc';
import aurora from '../assets/images/aurora_background.png';
import LongButton from '../components/ButtonItems/LongButton';
import sol from '../assets/images/character_sol.png';
import solGo from "../assets/images/sol_go_main.png";
import CenterModal from '../components/Modals/CenterModal';
import Mypage from './Mypage';

import { useRecoilState} from 'recoil';
import {centerModalState} from '../recoil/centerModal/atom'

type IntroProps = {
  navigation: StackNavigationProp<any>;
};

const Intro:React.FC<IntroProps> = ({navigation}) => {
  const translateY = new Animated.Value(0);

  const [modalVisible, setModalVisible] = useRecoilState(centerModalState); //recoil state: 모달
  
  useEffect(() => {
    const animateSol = () => {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => {
        animateSol();
      });
    };

    animateSol();
  }, []);

  const handleNavigate = () =>{
    navigation.navigate("Login", {
      animation : 'fadeIn'
    });
  }

  return (
    <View style={tw `flex flex-1 bg-black items-center justify-center text-white`}>
      <ImageBackground source={aurora} style={tw `w-full h-full absolute`}></ImageBackground>

      <View style={tw `flex-2 w-full h-full`}>
        <View style={tw `mt-35 w-full ml-5`}>
          <Text style={tw `text-2xl font-semibold mb-4 text-[#fff]`}>여행을 앞두고 계신가요?</Text>
          <Text style={tw `text-base mb-1 text-[#fff]`}>동행통장과 함께 쏠쏠한 추억 쌓아요</Text>
          <Text style={tw `text-base text-[#fff]`}>북극성 여행작가 쏠이 가이드해드릴게요!</Text>
        </View>
      </View>

      <View style={tw `flex-3 flex justify-center items-center`}>
      <Animated.View
        style={[
          { transform: [{ translateY }] },
        ]}
      >
          <Image
            source={sol}
          />
        </Animated.View>
      </View>

      <LongButton content="시작하기" onPress={handleNavigate} />
        <View style={tw `mb-10`}>
            <CenterModal modalTitle={"여행 종료"} content1={"산하님, 즐거운 여행 되셨나요?"} content2={"정산 내역을 안내해드리겠습니다."}/>
            <Button onPress={()=>{navigation.navigate("EndTimeHistory")}} title='산하하던거'></Button>

        </View>

    </View>
  );
}

export default Intro;
