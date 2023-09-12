import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable'; // 애니메이션 라이브러리 추가
import { StackNavigationProp } from '@react-navigation/stack';

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

// 컴포넌트
import EndTimeGraph from '../components/Graph/EndTimeGraph';
import LongButton from '../components/ButtonItems/LongButton';
import EndTimeBarGraph from '../components/Graph/EndTimeBarGraph';

type EndTimeHistoryProps = {
  navigation: StackNavigationProp<any>;
};

const EndTimeHistory:React.FC<EndTimeHistoryProps> = ({navigation}) => {
  const [animation1, setAnimation1] = useState(null);
  const [animation2, setAnimation2] = useState(null);
  const [animation3, setAnimation3] = useState(null);

  const handleEndTimeHistory = () => {
    console.log("11");
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

  return (
    <View style={tw `flex-1 bg-white w-full`}>
      <ImageBackground source={starrynight} style={tw `w-full h-full absolute`}></ImageBackground>

      {/* 동행통장 지출 금액 */}
      <Animatable.View
        ref={(ref) => setAnimation1(ref)}
        style={tw `flex-3`}
      >
        <Animatable.View style={tw `flex-1 items-center mt-10`}>
          <Text style={tw `text-xl text-white mt-10`}>동행통장 지출 금액</Text>
          <Text style={tw `text-5xl font-bold text-white`}>980,000원</Text>
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
              <EndTimeGraph />
            </Animatable.View>

            <Animatable.View
              ref={(ref) => setAnimation3(ref)}
              style={tw `flex-1`}
            >
              <EndTimeBarGraph />
            </Animatable.View>
          </ScrollView>
        </SafeAreaView>
      </View>

      <View style={tw `flex-0.7 flex-row items-end justify-center`}>
        <LongButton content='다음' onPress={handleEndTimeHistory} />
      </View>
    </View>
  );
}

export default EndTimeHistory;