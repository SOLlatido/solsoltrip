import {View, Text, ScrollView } from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 컴포넌트
import UserInfo from '../components/Mypage/UserInfo';

const Mypage = () => {
    return(
        <ScrollView  style={tw`flex-1 bg-red-50`}>
            <View style={tw`flex-1 bg-orange-50`}>
                <UserInfo userName={"신산하"} point={300} coupon={4}/>
            </View>

            <View style={tw`flex-1 bg-amber-50`}>
                {/* 내 모든 계좌 */}
            </View>
        </ScrollView >
    )
}

export default Mypage