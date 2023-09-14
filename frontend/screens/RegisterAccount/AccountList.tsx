import React, { useState, useEffect } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, ScrollView, Pressable } from 'react-native'
import tw from "twrnc"
import SelectAccountItem from '../../components/Accounts/SelectAccounItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authHttp, nonAuthHttp } from '../../axios/axios';
import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil'
import { createAccountState } from '../../recoil/user/createAccountAtom'

function AccountList() {
  // const [accountInfo, setAccountInfo] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState<number>();
  const [newAccount, setNewAccount] = useRecoilState(createAccountState)
  
  useEffect(() => {
    console.log(newAccount);
  }, [newAccount]); 
  let memberN:number;
  useEffect(()=>{
    async function getAvailableAccounts(){
      const loginUser = await AsyncStorage.getItem("loginUser")
      const parsed = JSON.parse(loginUser as string)
      memberN = parsed.memberSeq;
      console.log("memberN", memberN);
      const send = {
        "memberSeq" : memberN
      }
      try {
        const response = await nonAuthHttp.post(`api/trip/validation`, send);
        const data = response.data;
        console.log("data", data["responseVOList"]);
        setAccounts(data["responseVOList"])
      } catch (error) {
          const err = error as AxiosError
          console.log(err)
          alert("에러!!")
      }
    }
    getAvailableAccounts();
    
  },[])

  const handleAccountPress = (index:number) => {
    setSelectedAccount(index);
    setNewAccount((prevNewAccount) => ({
      ...prevNewAccount,
      registerAccountSeq: index,
      memberSeq : memberN,
    }));
    console.log(newAccount);
  };
  return (
    <>
    <View style={tw `w-full h-full bg-[#DBE4E4]`}>
      <View style={tw `mt-30`}>
      <View>
        <Text style={tw `text-lg self-center mt-5`}>Step 1 / 4</Text>
        <Text style={tw `text-base self-center mt-1`}>동행통장으로 사용하실 계좌를 선택해주세요.</Text>
      </View>

      <ScrollView style={tw `mt-10`}>
      {accounts.map((account, index) => (
              <Pressable
                key={account["registedAccountSeq"]}
                onPress={() => handleAccountPress(account["registedAccountSeq"])}
                style={[
                  tw `mb-5 self-center w-6/7`,
                  selectedAccount === account["registedAccountSeq"] && tw`z-10 rounded-2xl border-4 border-[#51C0C7]`
                ]}
              >
                 {/* const {accountNumber, accountTitle, balance} = props; */}
                <SelectAccountItem accountNumber={account["account"]} accountTitle={account["name"]} balance={account["balance"]} />
              </Pressable>
            ))}
      </ScrollView>
      </View>
    </View>

    <NextButton action={()=>{}} router='AccountName'></NextButton>
    </>
  )
}

export default AccountList