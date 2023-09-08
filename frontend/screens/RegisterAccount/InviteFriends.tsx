import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import tw from 'twrnc'
import NextButton from '../../components/ButtonItems/NextButton'
import { Entypo, Feather} from '@expo/vector-icons';
import kakao from "../../assets/images/kakao.png"
import { Alert, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';

function InviteFriends() {
  const me = "다영"
  const travelTitle = "강릉 4박 5일 여행"
  const [shareUrl, setShareUrl] = useState("www.naver.com");
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(shareUrl);
    Alert.alert("초대링크가 복사되었습니다")
  };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setShareUrl(text);
  // };
  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View style={tw `flex pl-6`} >
        <Text style={tw `text-2xl font-bold`}>{travelTitle}</Text>
        <Text style={tw `text-sm mt-5`}>
          함께 여행할 동행을 초대해보세요.{"\n"}지출 내역 관리와 정산을 보다 손쉽게 할 수 있어요!
        </Text>
      </View >
      <View style={tw `mt-10`}>
      <TouchableOpacity
            activeOpacity={0.8}
            style={[
                tw`w-5/7 bg-[#51C0C7]/90 h-12 rounded-[4] justify-center self-center items-center`,
              ]}
              onPress={() => {
                copyToClipboard()
              }}
        >
            <Text style={tw `text-white text-base font-semibold`}><Entypo name="link" size={18} color="white" /> &nbsp;초대 링크 복사</Text>
        </TouchableOpacity>

      <TouchableOpacity
            activeOpacity={0.8}
            style={[
                tw`w-5/7 mt-3 bg-[#7B5AF3]/70 h-12 rounded-[4] justify-center self-center items-center`,
              ]}
              onPress={() => {
                const shareOptions = {
                  message: `쏠쏠한 동행통장과 함께하는 여행! ${me}님이 ${travelTitle} 일정에 초대했어요. ${shareUrl}`,
                };
            
                Share.share(shareOptions)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }}
        >
{/* <Image style={tw `w-6 h-6`} source={kakao}> */}
            <Text style={tw `text-[#FFF] text-base font-semibold`}> <Feather name="share" size={18} color="#FFF" />&nbsp;바로 초대하기</Text>
        </TouchableOpacity>

      </View>

      </View>
      <NextButton router='InviteFriends'></NextButton>

      </View>

    
    
    </>
  )
}

export default InviteFriends