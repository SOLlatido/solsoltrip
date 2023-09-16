import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,  Dimensions, Image } from 'react-native';
import tw from 'twrnc';

// 컴포넌트
import LongButton from '../ButtonItems/LongButton';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const SavingMoneySlider = (finalFee:EndTripSettleResponse) => {

  useEffect(()=>{
    
    console.log(finalFee?.finalFee?.settlementList);
    // console.log(2);
  },[finalFee])

  return (
    <View style={[tw`flex-1`, { backgroundColor: 'rgba(11, 11, 59, 0.5)'}]}>


      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`mt-[40px]`}>

        {
          finalFee.finalFee?.settlementList?.length === 0?(
            <View style={styles.slider}>
                <Text style={tw`text-[30px] font-bold text-white items-center mt-[40%]`}>참여자 정보가 없습니다.</Text>
            </View>
          ):(
            finalFee.finalFee?.settlementList?.map((people, index)=>{
              return(
                <View key={index} style={styles.slider}>
                    
                    <View style={tw`flex-col items-center justify-center w-full`}>
                        <Image
                                style={tw`w-20 h-20 rounded-full`}
                                source={{ uri: 'https://picsum.photos/100/100' }}
                                resizeMode="cover"
                        />
                        <Text style={tw`text-[20px] mt-2 font-bold text-white`}>{people.name} 님</Text>
                        {
                            people.isPositive===false?
                                <Text style={tw`text-[20px] font-bold mt-1 text-white`}>아래 금액을 받아야 합니다.</Text>
                                :
                                <Text style={tw`text-[20px] font-bold mt-1 text-white`}>아래 금액을 드려야 합니다.</Text>

                        }
                    </View>

                    <View style={tw`items-center mt-10`}>
                        <Text style={tw`text-[50px] text-5xl font-bold text-white`}>{people.formattedSettlement} 원</Text>
                    </View>

                    <View style={tw`flex-1 flex-row`}>
                        {
                          // 방장입장에서만 생각하자. 왜냐하면 참여자들은 신한 계좌가 없다고 생각해야 하기 떄문이다.
                            // receive : 방장이 돈을 받아야 한다
                            // send : 방장이 돈을 보내야 한다
                            // null : 내가 방장이면 아무것도 안뜸
                              // loginUser!==hostUser? null : (
                              //   people.type==="send" && !people.isHost ?<LongButton content='보내기'/>:(
                              //     people.type==="receive" && !people.isHost?<LongButton content='요청하기'/>:null
                              //   )
                              // )
      

                        }
                        {/* 현재 상황에서는 랜덤정산 생략하자 시간 남으면 진행 */}
                        {/* <LongButton content='랜덤정산'/>  */}
                    </View>
                </View>
              );
            })
          )
        }
      
      </ScrollView>

      
    </View>
  );
}

export default SavingMoneySlider;

const styles = StyleSheet.create({
    slider:{
      width:SCREEN_WIDTH,
      alignItems:"center",
    },
  });

  //6. 남은 금액 정산
type EndTripSettleRequest = {
  accompanySeq : number|null,
  memberSeq : number|null,
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