import {View, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 

const EventMapPointAnimation = () => {

    return(
        <View style={tw`w-full items-end mr-3`}>
            <LottieView style={tw`ml-10 w-[70] h-[100px] mt-3`} source={require('../../assets/lottie/coinAnimation.json')} autoPlay/>
            <Text style={tw`w-[70px] h-[20px] text-sm bg-white rounded-full text-center mt--3 mr-2`}>100p</Text>
        </View>
    )
}

export default EventMapPointAnimation