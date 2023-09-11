import {useState} from 'react';
import {View, SafeAreaView, ScrollView, Text, Image, Dimensions} from 'react-native';
import tw from 'twrnc'; 

// 컴포넌트
import UserInfo from '../Mypage/UserInfo';

const StoryContainer = () => {
    const windowWidth = Dimensions.get("window").width-300;
    const windowHeight = Dimensions.get("window").height-500;

    const [story, setStory] = useState([
        {
            profileImg: "https://picsum.photos/100/100",
            userName : "산하",
            place : "제주오굡",
            price : "20000",
            picture: "https://picsum.photos/100/100",
            content:"오겹살 존맛탱"
        },
        {
            profileImg: "https://picsum.photos/100/100",
            userName : "산하",
            place : "제주오굡",
            price : "20000",
            picture: "https://picsum.photos/100/100",
            content:"오겹살 존맛탱"
        }
    ]);

    return(
        <SafeAreaView style={tw`flex-1`}>
            <ScrollView style={tw`flex-1`}>
                {story.map(()=>{
                    return(
                        <View style={{...tw`flex-1 w-full h-4/6 bg-white p-5 mt-5 rounded-lg`,backgroundColor: 'rgba(11, 11, 59, 0.5)'}}>
                            
                            {/* 날짜 */}
                            <View style={tw `w-full h-10 mb-5 justify-center items-center text-center bg-[#7B5AF3] rounded-full justify-center items-center`}>
                                <Text style={tw `text-xl text-white`}>23.08.29 (화)</Text>
                            </View>
                            
                            {/* 유저정보 */}
                            <View style={tw`flex-1 flex-row justify-between items-center`}>
                                <View style={tw`flex-row items-center`}>
                                    <Image
                                        style={tw`w-20 h-20 rounded-full`}
                                        source={{ uri: 'https://picsum.photos/100/100' }}
                                    />
                                    <Text style={tw`ml-3 text-lg font-black text-white`}>산하</Text>
                                </View>

                                <View style={tw``}>
                                    <Text style={tw`text-center text-white`}>제주 오겹</Text>
                                    <Text style={tw`text-lg text-center text-white`}>20,000원</Text>
                                </View>
                            </View>

                            {/* 중심 사진 */}
                            <View style={tw`flex-1 w-full mt-5`}>
                                <Image
                                    style={tw`w-80 h-80 rounded-xl`}
                                    source={{ uri: 'https://picsum.photos/100/100' }}
                                />
                            </View>

                            {/* 메모 */}
                            <View>
                                <Text style={tw`text-white text-lg mt-5`}>오겹살 존맛탱</Text>
                            </View>
                        </View>
                    )
                })}
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default StoryContainer