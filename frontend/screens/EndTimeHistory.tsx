import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, SafeAreaView, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable'; // 애니메이션 라이브러리 추가
import { StackNavigationProp } from '@react-navigation/stack';
import { AxiosResponse, AxiosError } from "axios"
import { authHttp, nonAuthHttp } from '../axios/axios';

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

// 컴포넌트
import EndTimeGraph from '../components/Graph/EndTimeGraph';
import LongButton from '../components/ButtonItems/LongButton';
import EndTimeBarGraph from '../components/Graph/EndTimeBarGraph';
import LoadingAnimation_night from "../components/Animation/LoadingAnimation_night";

type EndTimeHistoryProps = {
  navigation: StackNavigationProp<any>;
};

const EndTimeHistory:React.FC<EndTimeHistoryProps> = ({navigation}) => {
  const [animation1, setAnimation1] = useState(null);
  const [animation2, setAnimation2] = useState(null);
  const [animation3, setAnimation3] = useState(null);
  const [loading, setLoading] = useState(true);

  const [totalCost, setTotalCost] = useState<number>(0);
  const [dailyGraphData, setDailyGraphData] = useState<number[]>([]);
  const [dailyGraphLabel, setDailyGraphLabel] = useState<string[]>([]);

  const [categoryGraphData, setCategoryGraphData] = useState<number[]>([]);
  const [categoryGraphLabel, setCategoryGraphLabel] = useState<string[]>([]);


  useEffect(()=>{
    async function prepare(){
      try{
        await new Promise(resolve => setTimeout(resolve,2000));
        setLoading(false);
      } catch(e){
        console.log(e);
      }
    }

    prepare();
  },[])
  


  const handleEndTimeHistory = () => {
    navigation.navigate("EndTimeSavingMoney");
  }

  useEffect(() => {
    if (animation1) animation1.slideInUp(1000); // 첫 번째 애니메이션
  }, [animation1]);

  useEffect(() => {
    if (animation2) animation2.slideInUp(2000); // 두 번째 애니메이션
  }, [animation2]);

  useEffect(() => {
    if (animation3) animation3.slideInUp(3000); // 세 번째 애니메이션
  }, [animation3]);

  //최종 여행 기록 안내 페이지
  async function getEndTripHistory(data:EndTimeHistoryRequest): Promise<void> {
    try {

        const response: AxiosResponse<EndTimeHistoryResponse> = await authHttp.post<EndTimeHistoryResponse>(`api/settlement/result`, data);
        const result: EndTimeHistoryResponse = response.data; //{status, message}
        
        if(response.status===200){
          const dailyMoney:number[] = [];
          const dailyDay:string[] = [];

          const categoryMoney:number[] = [];
          const category:string[] = [];

          result.dailyVOList.map((data, index)=>{
            dailyMoney.push(data.cost);
            dailyDay.push(data.acceptedDate);
          })

          result.categoryVOList.map((data, index)=>{
            categoryMoney.push(data.cost);
            category.push(data.category);
          })

          setDailyGraphData(dailyMoney);
          setDailyGraphLabel(dailyDay);
          setCategoryGraphData(dailyMoney);
          setCategoryGraphLabel(category);
        }


    } catch (error) {
        Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
        const err = error as AxiosError
        console.log(err);
      }
  }

  useEffect(()=>{
    // const EndTimeHistoryRequest = {
    //   accompanySeq: 1,
    //   memberSeq: 1
    // }
    // getEndTripHistory(EndTimeHistoryRequest);
  },[])

  return (
    <>
      {loading?<LoadingAnimation_night/>:<View style={tw `flex-1 bg-white w-full`}>
        <ImageBackground source={starrynight} style={tw `w-full h-full absolute`}></ImageBackground>

        {/* 동행통장 지출 금액 */}
        <Animatable.View
          ref={(ref) => setAnimation1(ref)}
          style={tw `flex-3`}
        >
          <Animatable.View style={tw `flex-1 items-center mt-10`}>
            <Text style={tw `text-xl text-white mt-10`}>동행통장 지출 금액</Text>
            <Text style={tw `text-5xl font-bold text-white`}>{totalCost}원</Text>
          </Animatable.View>
        </Animatable.View>

        {/* 스크롤 영역 */}
        <View style={tw `flex-10`}>
          <SafeAreaView>
            <ScrollView>
              {/* 그래프 */}
              <Animatable.View
                ref={(ref) => setAnimation2(ref)}
                style={tw `flex-1`}
              >
                <EndTimeGraph data={dailyGraphData} labels={dailyGraphLabel}/>
              </Animatable.View>

              <Animatable.View
                ref={(ref) => setAnimation3(ref)}
                style={tw `flex-1`}
              >
                <EndTimeBarGraph data={categoryGraphData} labels={categoryGraphLabel}/>
              </Animatable.View>
            </ScrollView>
          </SafeAreaView>
        </View>

        <View style={tw `flex-0.7 flex-row items-end justify-center`}>
          <LongButton content='다음' onPress={handleEndTimeHistory} />
        </View>
      </View>}
    </>
  );
}

export default EndTimeHistory; 

type EndTimeHistoryRequest = {
  accompanySeq:number,
  memberSeq:number
}

type EndTimeHistoryResponse = {
  isChecked:boolean,
  totalCost:number,
  categoryVOList:categoryVOList[],
  dailyVOList:dailyVOList[]
}

type categoryVOList = {
  category:string,
  cost:number,
  formattedCost:string
}

type dailyVOList = {
  acceptedDate:string,
  cost:number,
  formattedCost:string
}