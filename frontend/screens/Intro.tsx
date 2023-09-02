import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native'
import aurora from "../assets/images/aurora_background.png";
import LongButton from '../components/ButtonItems/LongButton';
function Intro() {
  return (
    <View style={styles.container}>

    <ImageBackground 
        source={aurora}
        style={styles.image}
        >
    </ImageBackground>

      <View style={styles.introContainer}>
        <View style={styles.titles}>
          <Text style= {styles.title}>여행을 앞두고 계신가요?</Text>
          <Text style= {styles.subtitle}>동행통장과 함께 쏠쏠한 추억 쌓아요</Text>
          <Text style= {styles.subtitle}>북극성 여행작가 쏠이 가이드해드릴게요!</Text>
        </View>

      </View >

      <View style={styles.character}>


      </View>

      <LongButton content='시작하기'></LongButton>
    </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      textColor : "#fff"
    },
    image : {
      width : '100%',
      height : '100%',
      resizeMode : "cover",
      position : "absolute",
  
    },
    introContainer : {
      flex : 2,
      width : '100%',
      height : '100%',
    },
    titles : {
      marginTop : '35%',
      width : "100%",
      marginLeft : "5%",
      color : "#fff"
    },
    title : {
      fontSize : 26,
      fontWeight : '500',
      marginBottom : 20,
      color : "#fff"
      
    },
    subtitle : {
      fontSize : 15,
      marginTop : 7,
      color : "#fff"
    },
    character : {
        flex : 3,
    }
})
  
export default Intro