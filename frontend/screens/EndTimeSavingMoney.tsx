import React, { useState, useEffect } from 'react';
import {View, Text, ImageBackground, Alert} from 'react-native';
import tw from 'twrnc'; 
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable'; // 애니메이션 라이브러리 추가
import { AxiosResponse, AxiosError } from "axios"
import { authHttp, nonAuthHttp } from '../axios/axios';

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

//컴포넌트
import SavingMoneySlider from '../components/Slider/SavingMoneySlider';
import LongButton from '../components/ButtonItems/LongButton';


type EndTimeSavingMoneyProps = {
    navigation: StackNavigationProp<any>;
};

const EndTimeSavingMoney:React.FC<EndTimeSavingMoneyProps> = ({navigation}) => {
    
    const [saving, setSaving] = useState<string>("0");

    const handleSavingMoney = (type:string) => {
        if(type==="prev")
            navigation.navigate("EndTimeHistory");
        else if(type==="next")
            navigation.navigate("EndTimeOurStory");
    }

    const [animation1, setAnimation1] = useState(null);
    const [animation2, setAnimation2] = useState(null);

    useEffect(() => {
        if (animation1) animation1.slideInUp(1000); // 첫 번째 애니메이션
      }, [animation1]);
    
      useEffect(() => {
        if (animation2) animation2.slideInUp(2000); // 두 번째 애니메이션
      }, [animation2]);


    // 남은 금액 정산
    async function EndTripSettle(data:EndTripSettleRequest): Promise<void> {
        try {

            const response: AxiosResponse<EndTripSettleResponse> = await authHttp.patch<EndTripSettleResponse>(`/api/settlement/settle`, data);
            const result: EndTripSettleResponse = response.data; //{status, message}
            
            if(response.status===200){
                setSaving(result.formattedLeft);
            }

        } catch (error) {
            Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
            const err = error as AxiosError
            console.log(err);
        }
    }

    return(
        <View style={tw`flex-1`}>
            
            <ImageBackground source={starrynight} style={tw `w-full h-full absolute`}/>
            
            <Animatable.View ref={(ref) => setAnimation1(ref)} style={tw `flex-2 justify-center items-center`}>
                <Text style={tw `text-xl text-white mt-10`}>동행통장 잔여 금액</Text>
                <Text style={tw `text-5xl font-bold text-white`}>{saving}원</Text>
            </Animatable.View>

            <Animatable.View ref={(ref) => setAnimation2(ref)} style={tw `flex-4 items-center justify-center`}>
                <SavingMoneySlider/>
            </Animatable.View>

            <View style={tw `flex-1 flex-row`}>
                <LongButton content='이전' onPress={()=>handleSavingMoney("prev")}/>
                <LongButton content='다음'onPress={()=>handleSavingMoney("next")} />
            </View>
        </View>
    )
}

export default EndTimeSavingMoney

//6. 남은 금액 정산
type EndTripSettleRequest = {
    accompanySeq : number,
    memberSeq : number,
}

type EndTripSettleResponse = {
    left : number,//전체 남은 금액 숫자
    formattedLeft : string, //전체 남은 금액 규격 표시 (,)
    settlementList:SettlementList[]
}

type SettlementList = { //각 참여자의 정산 금액
    name : string,
    isManager : boolean,
    isPositive : boolean,

    settlement : number,
    formattedSettlement : string,

    individualWithdraw : number,
    formattedIndividualWithdraw : string,

    individualDeposit : number,
    formattedIndividualDeposit : string
}