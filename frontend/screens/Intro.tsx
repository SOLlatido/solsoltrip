// import React, {useEffect} from 'react'
// import { View, Text, Button, ImageBackground, StyleSheet, Image, StatusBar, Animated, Easing} from 'react-native'
// import aurora from "../assets/images/aurora_background.png";
// import LongButton from '../components/ButtonItems/LongButton';
// import sol from "../assets/images/character_sol.png";

// function Intro() {
//   //쏠 이미지의 Y값 구하기 
//   const translateY = new Animated.Value(0);
//   useEffect(() => {
//     const animateSol = () => {
//       Animated.sequence([
//         Animated.timing(translateY, {
//           toValue: 15, //상승 좌표
//           duration: 900, 
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//         Animated.timing(translateY, {
//           toValue: 0, //다시 원래 위치로
//           duration: 900, 
//           easing: Easing.linear,
//           useNativeDriver: false,
//         }),
//       ]).start(() => {
//         // 애니메이션 루프 다시 시작하는 재귀함수
//         animateSol();
//       });
//     };

//     // Start the initial animation loop
//     animateSol();
//   }, []);

//   return (
//     <View style={styles.container}>

//     <ImageBackground 
//         source={aurora}
//         style={styles.image}
//         >
//     </ImageBackground>

//       <View style={styles.introContainer}>
//         <View style={styles.titles}>
//           <Text style= {styles.title}>여행을 앞두고 계신가요?</Text>
//           <Text style= {styles.subtitle}>동행통장과 함께 쏠쏠한 추억 쌓아요</Text>
//           <Text style= {styles.subtitle}>북극성 여행작가 쏠이 가이드해드릴게요!</Text>
//         </View>
//       </View >

//       <View style={styles.character}>
//       <Animated.View
//           style={[
//             styles.sol,
//             {
//               transform: [{ translateY }],
//             },
//           ]}
//         >
//         <Image
//           style = {styles.sol}
//           source={sol}/>
//         </Animated.View>
//       </View>

//       <LongButton content='시작하기'></LongButton>

//     </View>
//   )
  
// }
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#000',
//       alignItems: 'center',
//       justifyContent: 'center',
//       textColor : "#fff"
//     },
//     image : {
//       width : '100%',
//       height : '100%',
//       resizeMode : "cover",
//       position : "absolute",
  
//     },
//     introContainer : {
//       flex : 2,
//       width : '100%',
//       height : '100%',
//     },
//     titles : {
//       marginTop : '35%',
//       width : "100%",
//       marginLeft : "5%",
//       color : "#fff"
//     },
//     title : {
//       fontSize : 26,
//       fontWeight : '500',
//       marginBottom : 20,
//       color : "#fff"
      
//     },
//     subtitle : {
//       fontSize : 15,
//       marginTop : 7,
//       color : "#fff"
//     },
//     character : {
//         flex : 3,
//         resizeMode : "cover",
//         justifyContent : "center",
//         alignItems : "center"
//         // width : 
//     },
//     sol : {
//     }
// })
  
// export default Intro

import React, { useEffect } from 'react';
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

function Intro() {
  const translateY = new Animated.Value(0);

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

  return (
    <View style={tw `flex flex-1 bg-black items-center justify-center text-white`}>
      <ImageBackground source={aurora} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>

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
          tw`transform`,
          { transform: [{ translateY }] },
          tw`transition-transform duration-1000 ease-linear`,
        ]}
      >
          <Image
            source={sol}
          />
        </Animated.View>
      </View>

      <LongButton content="시작하기" />
    </View>
  );
}

export default Intro;
