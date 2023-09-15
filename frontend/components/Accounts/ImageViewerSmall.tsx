import { Image } from "react-native";
import tw from 'twrnc'

export default function ImageViewerSmall( props:{ placeholderImageSource:any}) {
    const imageSource = props.placeholderImageSource;
  
    return <Image source={imageSource} style={tw `w-15 h-14 rounded-2`} />;
  }

