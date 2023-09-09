import LottieView from 'lottie-react-native';
import tw from 'twrnc'; 
import { useRecoilState} from 'recoil';
import {centerModalState} from '../../recoil/centerModal/atom';
import {View, Dimensions} from "react-native";

import React, {useState, useEffect} from 'react';

const EventMapAnimation = () => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const [modalVisible, setModalVisible] = useRecoilState<CenterModalState>(centerModalState);

    useEffect(()=>{
        console.log(modalVisible);
    },[modalVisible])
    

    return(
        modalVisible.event?
        <View style={tw`flex-1 justify-center items-center`}><LottieView style={tw`w-[${windowWidth}] h-[${windowHeight}]`} source={require('../../assets/lottie/eventAnimation.json')} autoPlay loop/></View>:null
    )
}

export default EventMapAnimation

interface CenterModalState{
    open:boolean;
    event:boolean;
}