import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 
import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';
import {View } from "react-native";

import React, {useState, useEffect} from 'react';

const EventMapAnimation = () => {

    const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);

    useEffect(()=>{
        console.log(modalVisible);
    },[modalVisible])
    

    return(
        modalVisible.event?
        <View style={tw`flex-1 justify-center items-center`}><LottieView style={tw`w-[200] h-[200]`} source={require('../../assets/lottie/eventAnimation.json')} autoPlay loop/></View>:null
    )
}

export default EventMapAnimation

interface CenterModalState{
    open:boolean;
    event:boolean;
}