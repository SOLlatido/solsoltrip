import React from 'react'
import { Image, ImageSourcePropType, ImageStyle } from 'react-native'
import backBtn from '../../assets/images/back_button.png'
import tw from "twrnc"
interface BackButtonProps {
    source: ImageSourcePropType;
    style: ImageStyle;
  }
const BackButton = () => {
    const imageSource:ImageSourcePropType = backBtn
    const imageStyle: ImageStyle = { width: 30, height: 30 };
    return (
      <Image
        source={imageSource}
        style ={imageStyle}
      >
        
      </Image>
    )
  }

export default BackButton

