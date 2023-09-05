import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, Pressable } from 'react-native'
import backBtn from '../../assets/images/back_button.png'
import { useNavigation } from 'expo-router'
import tw from "twrnc"
interface BackButtonProps {
    source: ImageSourcePropType;
    style: ImageStyle;
  }
const BackButton = (props) => {
    const navigation = useNavigation();
    const imageSource:ImageSourcePropType = backBtn
    const imageStyle: ImageStyle = { width: 30, height: 30 };
    return (
      <Pressable onPress={()=>{navigation.goBack(); console.log("yay")}}>
      <Image
        source={}
        style ={imageStyle}
      >
        
      </Image>
      </Pressable>
    )
  }

export default BackButton

