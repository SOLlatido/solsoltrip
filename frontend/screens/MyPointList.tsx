import {View, ImageBackground, TouchableOpacity, Text, ScrollView, Alert} from "react-native"
import React, { useEffect, useState } from 'react'

import main_aurora from "../assets/images/main_aurora.png"
import PointSearchBar from "../components/Inputs/PointSearchBar";
import EarnPointItem from "../components/Accounts/EarnPointItem";
import tw from "twrnc";

// 컴포넌트
import PointItem from "../components/Accounts/PointItem";

// axios
import {authHttp, nonAuthHttp} from '../axios/axios';
import { AxiosResponse, AxiosError } from "axios"

const MyPointList = () => {
    const accountNumber:string = "포인트는 개인 계좌로 연동됩니다.";
    const [myPoint, setMyPoint] = useState<number>(0);
    const [myPointList, setMyPointList] = useState<PointVO[]|null>(null);
    const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (text:string) => {
    setSearchText(text);
  };


  // axios
  //유저의 포인트 리스트 가져오기
  async function getPointList(data:eventPointRequest): Promise<void> {
    try {
      
      const response: AxiosResponse<eventPointResponse> = await nonAuthHttp.post<eventPointResponse>(`api/event/point`, data);
      const result = response.data;
      console.log(result);
        if(response.status===200){
            setMyPointList(result.pointVOList)
            setMyPoint(result.myPoint);
        }else{
          return;
        }
        
    } catch (error) {
        Alert.alert("시스템 에러입니다.\n빠른 시일 내 조치를 취하겠습니다.");
        const err = error as AxiosError
        console.log(err);
    }
  }

  useEffect(()=>{
    getPointList({memberSeq: 1});
  },[])

  return (
    <>
    <View style={tw `h-full`}> 
        <ImageBackground source={main_aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
        <View style={tw `mt-25 z-10`}>
            <PointItem 
                accountNumber={accountNumber} 
                point={myPoint}
            />
        </View>
            {/* 내용이 들어가는 View */}
            <View style={tw`-mt-20 flex-col w-full flex-1 bg-white rounded-t-7`}> 
                {/* 검색 */}
                <View style={tw `mt-19 w-7/8 self-center`}>
                    <PointSearchBar onChangeText={handleSearch} value={searchText} />
                </View>
                
                {/* expenseHistory */}
                <View style={tw `flex-7 items-center mt-5`}>
                    <ScrollView style={tw `bg-white flex-0.9 w-7/8`}>
                        {myPointList?.map((pointData, index)=>{

                            return(
                                <EarnPointItem key={index}  expenseTitle={pointData.name} date={pointData.acceptedDate} expense={pointData.point}/>
                            );
                        })}

                    </ScrollView>
                </View>
            </View>
        </View>
    </>
  )
}

export default MyPointList

type eventPointRequest = {
    memberSeq : number
} 

type eventPointResponse = {
    myPoint : number,
    pointVOList : PointVO[]
}


type PointVO = {
    name : string,
    point : number,
    acceptedDate : string
}