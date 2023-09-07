import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,  Dimensions, Image } from 'react-native';
import tw from 'twrnc';

// 컴포넌트
import LongButton from '../ButtonItems/LongButton';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const SavingMoneySlider = () => {
    const loginUser = "tksgk2598";
    const hostUser = "tksgk2598";
    const [Participants, setParticipants] = useState([
    {
        userId : "tksgk2598",
        userName: "신산하",
        profileImg: 'https://picsum.photos/100/100',
        money: "8,000",
        isHost: true,
        type: "receive" //send or receive
      },
      {
        userId : "sdy",
        userName: "석다영",
        profileImg: 'https://picsum.photos/100/100',
        money: "2,000",
        isHost: false,
        type: "receive" //send or receive
      },
      {
        userId : "kms",
        userName: "김민식",
        profileImg: 'https://picsum.photos/100/100',
        money: "5,000",
        isHost: false,
        type: "receive" //send or receive
      },
      {
        userId : "lsh",
        userName: "이승현",
        profileImg: 'https://picsum.photos/100/100',
        money: "5,000",
        isHost: false,
        type: "receive" //send or receive
      }
  ]);


  return (
    <View style={[tw`flex-1`, { backgroundColor: 'rgba(11, 11, 59, 0.5)'}]}>


      <ScrollView 
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`mt-[40px]`}>

        {
          Participants.length === 0?(
            <View style={styles.slider}>
                <Text style={tw`text-[30px] font-bold text-white items-center mt-[40%]`}>참여자 정보가 없습니다.</Text>
            </View>
          ):(
            Participants.map((people, index)=>{
              return(
                <View key={index} style={styles.slider}>
                    
                    <View style={tw`flex-col items-center justify-center w-full`}>
                        <Image
                                style={tw`w-20 h-20 rounded-full`}
                                source={{ uri: 'https://picsum.photos/100/100' }}
                                resizeMode="cover"
                        />
                        <Text style={tw`text-[20px] mt-2 font-bold text-white`}>{people.userName} 님</Text>
                        {
                            people.type==="receive"?
                                <Text style={tw`text-[20px] font-bold mt-1 text-white`}>아래 금액을 받아야 합니다.</Text>
                                :
                                <Text style={tw`text-[20px] font-bold mt-1 text-white`}>아래 금액을 드려야 합니다.</Text>

                        }
                    </View>

                    <View style={tw`items-center mt-10`}>
                        <Text style={tw`text-[50px] font-3xl font-bold text-white`}>{people.money} 원</Text>
                    </View>

                    <View style={tw`flex-1 flex-row`}>
                        {
                          // 방장입장에서만 생각하자. 왜냐하면 참여자들은 신한 계좌가 없다고 생각해야 하기 떄문이다.
                            // receive : 방장이 돈을 받아야 한다
                            // send : 방장이 돈을 보내야 한다
                            // null : 내가 방장이면 아무것도 안뜸
                              loginUser!==hostUser? null : (
                                people.type==="send" && !people.isHost ?<LongButton content='보내기'/>:(
                                  people.type==="receive" && !people.isHost?<LongButton content='요청하기'/>:null
                                )
                              )
      

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