import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView,  Dimensions, Image } from 'react-native';
import tw from 'twrnc';

// 컴포넌트
import LongButton from '../ButtonItems/LongButton';

const {width:SCREEN_WIDTH} = Dimensions.get("window");

const SavingMoneySlider = () => {
    const loginUser = "tksgk2598";
    const [Participants, setParticipants] = useState([
    {
        userId : "sdy",
        userName: "신산하",
        profileImg: 'https://picsum.photos/100/100',
        money: "8,000",
        isHost: true,
        type: "send" //send or receive
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
                            // receive : 방장이 사람들에게 돈을 보내야 함 (방장이 보내기 진행)
                            // send : 사람들이 방장한테 돈을 보내야 함 (방장이 돈 달라고 요청)
                            // null : 내가 방장이면 아무것도 안뜸
                           
                                people.type==="receive" && !people.isHost?<LongButton content='보내기'/>:
                                (
                                    people.type==="send" && !people.isHost?<LongButton content='보내기'/>:null
                                )
                                
                            
                            
                                
                        }
                        {loginUser!==people.userId?null:<LongButton content='랜덤정산'/>}
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