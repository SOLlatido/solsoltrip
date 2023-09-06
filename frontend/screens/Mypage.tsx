import {View, Text} from 'react-native';
import tw from 'twrnc'; 
import { Ionicons } from "@expo/vector-icons";

// 컴포넌트
import UserInfo from '../components/Mypage/UserInfo';

const Mypage = () => {
    return(
        <View style={tw`flex-1 bg-red-50`}>
            <View style={tw`flex-1 bg-orange-50`}>
                <UserInfo/>
            </View>

            <View style={tw`flex-2 bg-amber-50`}>
                {/* 내 모든 계좌 */}
            </View>
        </View>
    )
}

export default Mypage