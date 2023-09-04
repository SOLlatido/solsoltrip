import React, { useState } from 'react'
import { View, Text} from 'react-native'
import AccountItem from '../components/Accounts/AccountItem'
function MyAccounts() {
  const [myAccounts, setMyAccounts] = useState([])

  const accountNumber:string = "123232123"
  const travelTitle:string = "4박 5일 강릉 여행"
  const duration:string = "2023-07-16 ~ 2023-07-20"
  const numberOfPeople:number = 4

  return (
    // {myAccounts.length === 0?
    
    
    // :
    
    // }
    <View>
        <Text>This is an account page</Text>
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
    </View>
  )
}

export default MyAccounts