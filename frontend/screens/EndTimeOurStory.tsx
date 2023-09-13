import React, { useState, useEffect } from 'react';
import {View, Text, ImageBackground} from 'react-native';
import tw from 'twrnc'; 
import { StackNavigationProp } from '@react-navigation/stack';
import * as Animatable from 'react-native-animatable'; // 애니메이션 라이브러리 추가

// 이미지
import starrynight from '../assets/images/starrynight_bg.jpg';

// 컴포넌트
import StoryContainer from '../components/Container/StoryContainer';
import LongButton from '../components/ButtonItems/LongButton';
// import LoadingAnimation_morning from '../components/Animation/LoadingAnimation_morning';

type EndTimeOurStoryProps = {
    navigation: StackNavigationProp<any>;
};

const EndTimeOurStory:React.FC<EndTimeOurStoryProps> = ({navigation}) => {
    const [animation1, setAnimation1] = useState(null);
    const [animation2, setAnimation2] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(()=>{
    //     async function prepare(){
    //       try{
    //         await new Promise(resolve => setTimeout(resolve,2000));
    //         setLoading(false);
    //       } catch(e){
    //         console.log(e);
    //       }
    //     }
    
    //     prepare();
    // },[])

    const handleEndTimeOutStory = (type:string) => {
        if(type==="prev")
            navigation.navigate("EndTimeSavingMoney");
        else if(type==="end")
            navigation.navigate("MyAccounts");
    }

    useEffect(() => {
        if (animation1) animation1.slideInUp(1000); // 첫 번째 애니메이션
    }, [animation1]);
    
    useEffect(() => {
        if (animation2) animation2.slideInUp(2000); // 두 번째 애니메이션
    }, [animation2]);
    

    return(
        <>
            <View style={tw`flex-1`}>
                
                <ImageBackground source={starrynight} style={tw `w-full h-full bg-cover absolute`}/>
                
                <View style={tw`flex-1 items-center justify-center`}>

                    <Animatable.View ref={(ref) => setAnimation1(ref)} style={tw `flex-2 justify-center items-center pt-15`}>
                        <Text style={tw `text-2xl text-white`}>우리의 스토리</Text>
                    </Animatable.View>

                </View>

                {/* 컨텐츠 */}
                <Animatable.View ref={(ref) => setAnimation2(ref)} style={tw`flex-5 w-full items-center justify-center`}>
                    <StoryContainer/>
                </Animatable.View>

                <View style={tw`flex-1 flex-row items-center justify-center`}>
                <LongButton content='이전' onPress={()=>handleEndTimeOutStory("prev")}/>
                    <LongButton content='종료'onPress={()=>handleEndTimeOutStory("end")} />
                </View>


            </View>
        </>
    )
}

export default EndTimeOurStory