import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native'
import aurora from "../assets/images/aurora_background.png";
import LongButton from '../components/ButtonItem/LongButton';

function Intro() {
  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>

        <ImageBackground 
          source={aurora}
          style={styles.image}
          >
        </ImageBackground>
        <View style={styles.titles}>
          <Text style= {styles.title}>여행을 앞두고 계신가요?</Text>
          <Text style= {styles.subtitle}>동행통장과 함께 쏠쏠한 추억 쌓아요</Text>
          <Text style= {styles.subtitle}>북극성 여행작가 쏠이 가이드해드릴게요!</Text>
          
          <LongButton></LongButton>
        </View>
      </View>
    </View>
  )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      color : "#fff"
    },
    image : {
      width : '100%',
      height : '100%',
      resizeMode : "cover",
      position : "absolute",
  
    },
    introContainer : {
      width : '100%',
      height : '100%',
    },
    titles : {
      marginTop : '35%',
      width : "100%",
      marginLeft : "5%"
    },
    title : {
      fontSize : 26,
      fontWeight : 'bold',
      marginBottom : 15
    },
    subtitle : {
      fontSize : 17,
      marginTop : 5
    },
})
  
export default Intro