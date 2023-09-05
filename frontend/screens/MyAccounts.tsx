import React, { useState } from 'react'
import { ScrollView, Text, ImageBackground} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import { StackNavigationProp } from '@react-navigation/stack';
import tw from "twrnc"
import aurora from "../assets/images/aurora_background.png"
type NavigationProps = {
  navigation: StackNavigationProp<any>;
};
const MyAccounts:React.FC<NavigationProps> = ({navigation}) => {
  const [myAccounts, setMyAccounts] = useState([])

  const accountNumber:string = "123232123"
  const travelTitle:string = "4박 5일 강릉 여행"
  const duration:string = "2023-07-16 ~ 2023-07-20"
  const numberOfPeople:number = 4

  return (
    // {myAccounts.length === 0?
    
    
    // :
    
    // }
    <>
      <ImageBackground source={aurora} style={tw `w-full bg-[#ddd] h-full absolute`}></ImageBackground>

    <Text style={tw `mt-30 text-base self-center`}>통장을 클릭하여 나의 여행을 확인해보세요.</Text>
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
    </ScrollView>
    </>
  )
}

export default MyAccounts