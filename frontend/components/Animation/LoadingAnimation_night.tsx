import {View, Text, ImageBackground} from 'react-native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 
import aurora_background from "../../assets/images/starrynight_bg.jpg"

const LoadingAnimation = () => {

    return(
        <View style={tw`bg-blue-100 w-full h-full justify-center items-center `}>
            <ImageBackground source={aurora_background} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
            <LottieView style={tw`flex-3 w-full h-full`} source={require('../../assets/lottie/loadingAnimation.json')} autoPlay/>
            <Text style={tw`flex-1 w-full h-10 text-center text-[40px] font-black text-white mt--60`}>SOLSOL TRIP</Text>
        </View>
    )
}

export default LoadingAnimation