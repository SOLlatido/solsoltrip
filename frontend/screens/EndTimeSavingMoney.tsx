import React, { useState, useEffect } from 'react';
import {View, Text, ImageBackground} from 'react-native';
import tw from 'twrnc'; 
import { StackNavigationProp } from '@react-navigation/stack';

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

//컴포넌트
import SavingMoneySlider from '../components/Slider/SavingMoneySlider';
import LongButton from '../components/ButtonItems/LongButton';


type EndTimeSavingMoneyProps = {
    navigation: StackNavigationProp<any>;
};

const EndTimeSavingMoney:React.FC<EndTimeSavingMoneyProps> = ({navigation}) => {
    
    const [saving, setSaving] = useState("20,000");

    const handleSavingMoney = () => {
        navigation.navigate("EndTimeHistory");
    }
    // const handleSavingMoney = () => {
    //     navigation.navigate("EndTimeSavingMoney");
    // }

    return(
        <View style={tw`flex-1`}>
            <ImageBackground source={starrynight} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>
            
            <View style={tw `flex-2 justify-center items-center`}>
                <Text style={tw `text-xl text-white mt-10`}>동행통장 잔여 금액</Text>
                <Text style={tw `text-5xl font-bold text-white`}>{saving}원</Text>
            </View>

            <View style={tw `flex-3 items-center justify-center`}>
                <SavingMoneySlider/>
            </View>

            <View style={tw `flex-1 flex-row`}>
                <LongButton content='이전' onPress={handleSavingMoney}/>
                <LongButton content='다음'/>
            </View>
        </View>
    )
}

export default EndTimeSavingMoney