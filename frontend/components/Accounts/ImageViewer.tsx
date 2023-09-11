import { Image } from "react-native";
import tw from 'twrnc'

export default function ImageViewer( props:{ placeholderImageSource:any, selectedImage:any }) {
    const imageSource = props.selectedImage  ? { uri: props.selectedImage } : props.placeholderImageSource;
  
    return <Image source={imageSource} style={tw `w-35 h-35 justify-center items-center rounded-2`} />;
  }