import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import { StackNavigationProp } from '@react-navigation/stack';
import tw from "twrnc"
import { AntDesign } from '@expo/vector-icons';
import aurora from "../assets/images/aurora_background.png"
import LongButton from '../components/ButtonItems/LongButton';
import LoadingAnimation_morning from '../components/Animation/LoadingAnimation_morning';

type NavigationProps = {
  navigation: StackNavigationProp<any>;
};
const MyAccounts:React.FC<NavigationProps> = ({navigation}) => {
  const [myAccounts, setMyAccounts] = useState([])
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function prepare(){
          try{
            await new Promise(resolve => setTimeout(resolve,2000));
            setLoading(false);
          } catch(e){
            console.log(e);
          }
        }
    
        prepare();
    },[])

  const accountNumber:string = "123232123"
  const travelTitle:string = "4박 5일 강릉 여행"
  const duration:string = "2023-07-16 ~ 2023-07-20"
  const numberOfPeople:number = 4

  const handleRegisterAccount = () => {
    navigation.navigate("AccountList");
  }
  return (
    // {myAccounts.length === 0?
    
    
    // :
    
    // }
    <>
      {loading?<LoadingAnimation_morning/>:<View style={tw`flex-1`}>
        <ImageBackground source={aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>
        <View style={tw`flex`}>
        <Text style={tw `ml-7 mt-30 text-base self-center font-bold text-xl self-start`}>다영님의 동행통장</Text>
        <Text style={tw `ml-7 text-base text-[#333]`}>통장을 클릭하여 나의 여행을 확인해보세요.</Text>
        </View>
        <ScrollView style={tw `mt-5`}>
            <AccountItem 
              accountNumber={accountNumber} 
              travelTitle={travelTitle}
              duration={duration}
              numberOfPeople={numberOfPeople}
              >
              </AccountItem>
            <AccountItem 
              accountNumber={accountNumber} 
              travelTitle={travelTitle}
              duration={duration}
              numberOfPeople={numberOfPeople}
              >
              </AccountItem>
            <AccountItem 
              accountNumber={accountNumber} 
              travelTitle={travelTitle}
              duration={duration}
              numberOfPeople={numberOfPeople}
              >
              </AccountItem>
            <AccountItem 
              accountNumber={accountNumber} 
              travelTitle={travelTitle}
              duration={duration}
              numberOfPeople={numberOfPeople}
              >
              </AccountItem>
        </ScrollView>
        <View style={tw `flex absolute bottom-10 w-3/4 p-4 self-center items-center justify-center`}>
          <TouchableOpacity
            onPress={handleRegisterAccount}
            activeOpacity={0.8}
            style={tw`w-6/7 bg-[#7B5AF3] h-12 rounded-[4] justify-center items-center shadow-md`}
          >
            <Text style={tw `text-white text-lg font-semibold`}><AntDesign name="pluscircleo" size={17} color="white" />&nbsp;등록하기</Text>
          </TouchableOpacity>
        </View>
      </View>}
    </>
  )
}

export default MyAccounts