import { View, Text, Image, Dimensions, Pressable } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from "@expo/vector-icons";

const UserInfo = ({userName, point, coupon}:UserInfo) => {

    return (
        <View style={tw`flex-1 mt-30`}>
            <View style={tw`flex-1`}>
                <View style={tw`flex-1 p-5 flex-1 flex-row items-center`}>

                    <View>
                        <Image
                            style={tw`w-20 h-20 rounded-full`}
                            source={{ uri: 'https://picsum.photos/100/100' }}
                            resizeMode="cover"
                        />
                    </View>

                    <Text style={tw`ml-5 text-xl font-black`}>{userName} 님</Text>

                </View>

                <View style={tw`flex-1 items-center shadow-md`}>
                    <View style={tw`flex-1 bg-violet-100 w-[90%] h-30 justify-center items-center rounded-3xl`}>

                        <View style={tw`pl-5 pr-5 flex-row justify-between`}>
                            <Text style={tw`flex-1 text-xl font-500`}>마이신한 포인트</Text>
                            <Pressable onPress={()=>console.log("pressed!")}><Text style={tw`flex-1 text-xl font-500 text-[#0046FF]`}>{point}P</Text></Pressable>
                        </View>

                        <View style={tw`pl-5 pr-5 flex-row justify-between`}>
                            <Text style={tw`flex-1 text-xl font-500`}>보유쿠폰</Text>
                            <Pressable onPress={()=>console.log("pressed!")}><Text style={tw`flex-1 text-xl font-500 text-[#0046FF]`}>{coupon}장</Text></Pressable>
                        </View>

                    </View>
                </View>
            </View>

        </View>
    );
}

export default UserInfo;

interface UserInfo{
    userName:string,
    point:number,
    coupon:number
}
