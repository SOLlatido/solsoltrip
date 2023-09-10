import React, { useState } from 'react'
import NextButton from '../../components/ButtonItems/NextButton'
import { View, Text, ScrollView, Pressable } from 'react-native'
import tw from "twrnc"
import SelectAccountItem from '../../components/Accounts/SelectAccounItem';

function AccountList() {
  // const [accountInfo, setAccountInfo] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState<number>();
  const accountNumber = "110480000001"
  const accountTitle = "FNA증권거래예금"
  const balance = "331,551"
  const accountInfo = [
    { accountNumber: '110480000001', accountTitle: 'FNA증권거래예금', balance: '331,551' },
    { accountNumber: '110480000001', accountTitle: 'FNA증권거래예금', balance: '331,551' },
    { accountNumber: '110480000001', accountTitle: 'FNA증권거래예금', balance: '331,551' },
  ];

  const handleAccountPress = (index:number) => {
    setSelectedAccount(index);
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
      {accountInfo.map((account, index) => (
              <Pressable
                key={index}
                onPress={() => handleAccountPress(index)}
                style={[
                  tw `mb-5 self-center w-6/7`,
                  selectedAccount === index && tw`z-10 rounded-2xl border-4 border-[#51C0C7]`
                ]}
              >
                <SelectAccountItem {...account} />
              </Pressable>
            ))}

        {/* <SelectAccountItem accountNumber={accountNumber} accountTitle={accountTitle} balance={balance}></SelectAccountItem> */}
        {/* <SelectAccountItem accountNumber={accountNumber} accountTitle={accountTitle} balance={balance}></SelectAccountItem> */}
      </ScrollView>
      </View>
    </View>

    <NextButton router='AccountName'></NextButton>
    </>
  )
}

export default AccountList