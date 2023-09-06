import React, { useState, useEffect } from 'react';
import {View, Text, ImageBackground} from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

const EndTimeSavingMoney = () => {
    
    const [saving, setSaving] = useState("20,000");

    return(
        <View style={tw`flex-1`}>
            <ImageBackground source={starrynight} style={tw `w-full h-full bg-cover absolute`}></ImageBackground>
            
            <View style={tw `flex-2 justify-center items-center`}>
                <Text style={tw `text-xl text-white mt-10`}>동행통장 잔여 금액</Text>
                <Text style={tw `text-5xl font-bold text-white`}>{saving}원</Text>
            </View>

            <View style={tw `flex-3 bg-orange-100`}>

            </View>

            <View style={tw `flex-1 bg-blue-100`}>

            </View>
        </View>
    )
}

export default EndTimeSavingMoney