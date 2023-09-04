import React, { useState } from 'react'
import { ScrollView, Text} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
import { StackNavigationProp } from '@react-navigation/stack';
import tw from "twrnc"
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
    <ScrollView style={tw `mt-30`}>
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
  )
}

export default MyAccounts