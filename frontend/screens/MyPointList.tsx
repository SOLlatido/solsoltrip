import {View, ImageBackground, TouchableOpacity, TextInput, ScrollView, Alert, Text} from "react-native"
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import main_aurora from "../assets/images/main_aurora.png"

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
    const [searchList, setSearchList] = useState<PointVO[]|null>(null);
    
    const search = (searchText:string) => {

        if(searchText===""){
            setSearchList(myPointList);
            return;
        }
    
        const newSearchList:PointVO[]|null= [];
        
        myPointList?.map((data, index)=>{
          if(searchText===data.name){
            newSearchList.push(data);
          }
        })
    
        setSearchList(newSearchList);
      }

    const handleSearch = (text:string) => {
        setSearchText(text);
    };


  // axios
  //유저의 포인트 리스트 가져오기
  async function getPointList(data:eventPointRequest): Promise<void> {
    try {
      
      const response: AxiosResponse<eventPointResponse> = await nonAuthHttp.post<eventPointResponse>(`api/event/point`, data);
      const result = response.data;
      if(response.status===200){
            console.log(result);
            setMyPointList(result.pointVOList);
            setSearchList(result.pointVOList);
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
                    <View style={tw`border-[0.3] border-[#ddd] flex-row items-center bg-white rounded-2 h-13 px-4`}>
                        <TextInput
                            placeholder="포인트 내역 검색"
                            placeholderTextColor={"#777"}
                            style={tw`flex-1 text-[#555] text-sm`}
                            value={searchText}
                            onChange={(e)=>{setSearchText(e.nativeEvent.text)}}
                        />
                        <TouchableOpacity onPress={()=>search(searchText)}><Ionicons name="search" size={22} color="#888" style={tw`mr-2`} /></TouchableOpacity>
                    </View>
                </View>
                
                {/* expenseHistory */}
                <View style={tw `flex-7 items-center mt-5`}>
                    {searchList?.length!==0?<ScrollView style={tw `bg-white flex-0.9 w-7/8`}>
                        
                        {searchList?.map((pointData, index)=>{

                            return(
                                <EarnPointItem key={index}  expenseTitle={pointData.name} date={pointData.acceptedDate} expense={pointData.point}/>
                            );
                        })}
                        

                    </ScrollView>:
                    <Text style={tw`mt-40`}>상생포인트 조회 내역이 없습니다.</Text>}
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