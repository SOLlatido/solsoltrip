import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import tw from "twrnc";
import * as ImagePicker from 'expo-image-picker';
import PlaceholderImage from "../assets/images/sol_expense_large.png"
import ImageViewer from '../components/Accounts/ImageViewer';
import { MaterialIcons, FontAwesome, Feather, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { pickSpecificAccountInfoState } from '../recoil/account/pickSpecificAccountInfo';
import { currentDetailState } from '../recoil/account/currentDetailAtom';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authHttp } from '../axios/axios';
import { AxiosError } from 'axios';

const ExpenseDetail = ({route}) => {
  const { imageSource, expenseTitle, memo, date, expense, category:initialCategory } = route.params;
  const categoryIcons = [
    <MaterialIcons name="hotel" size={20} color="black" />,
    <FontAwesome name="plane" size={20} color="black" />,
    <FontAwesome name="bus" size={20} color="black" />,
    <Entypo name="location" size={20} color="black" />,
    <MaterialCommunityIcons name="food-fork-drink" size={18} color="black" />,
    <Feather name="shopping-bag" size={20} color="black" />,
    <FontAwesome name="question" size={20} color="black" />,
  ];
  const friendsList = ['석다영', '신산하', '이승현', '김민식'];
  const categoryLabels = ["숙소", "항공", "교통", "관광", "식비", "쇼핑", "기타"];
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedNames, setSelectedNames] = useState(friendsList);
  const [pick, setPick] = useRecoilState(pickSpecificAccountInfoState);
  const [detailId, setDetailId] = useRecoilState(currentDetailState);
  const [detailData, setDetailData] = useState<detailDataType>();
  //들어오면서 동시에 accompanyMemberWidthdrawSeq 를 가져온다. (atom에 저장한다) 
  //useEffect로 멤버번호와 위 번호를 쏘아서 요청을 보낸다.
  //받아온 친구들을 저장 후 보여준다.
  type detailDataType = {
    name : string,
    memo : string,
    const : number,
    category : string,
    time : string,
    picture : string
  }
  useEffect(()=>{
    // 로그인 유저 받아오기
    async function getLoginUser(){
      const loginUser = await AsyncStorage.getItem("loginUser")
      const parsed = JSON.parse(loginUser as string)
      const name:string = parsed.name;
      const userSeq:number = parsed.memberSeq;
      //멤버번호 + accompanyMemberWidthdrawSeq 
      console.log("선택한 지출상세의 아이디! :", detailId.accompanyMemberWithdrawSeq)
      //보낼 데이터
      const send = {
        accompanyMemberSeq : detailId.accompanyMemberWithdrawSeq,
        memberSeq : null
      }

      // setName(name);
      // setLoginUserSeq(userSeq);
      // setEndUpload(true); //1

      const getDetail = () => {
        async function callDetail(){
          try {
            const response = await authHttp.post(`api/payment/detail`, send);
            const data = response.data;
            console.log("data", data);
            //현재 선택된 지출상세 정보
            setDetailData(data);
          } catch (error) {
              const err = error as AxiosError
              console.log(err)
              alert("에러!!")
          }
        }
        callDetail();
      }
      getDetail();
    }
    getLoginUser();



  },[])
  const handleCategoryPress = (index:number) => {
    setSelectedCategory(index);
    console.log(index);
  };

  ////////////////////
  //동행별 지출 모듈 //
  ////////////////////
  const friendList = [
    {
      name : "석다영",
      expense : 8000,
    },
    {
      name : "신산하",
      expense : 8000,
    },
    {
      name : "이승현",
      expense : 8000,
    },
    {
      name : "김민식",
      expense : 8000,
    },
  ]
  const [expenses, setExpenses] = useState(
    friendList.map((friend) => friend.expense)
  );
  const [showExpenses, setShowExpenses] = useState(
    friendList.map((friend) => Math.ceil(friend.expense))
  );
  const [participants, setParticipants] = useState(
    friendList.map(() => true)
  );
  const [toggledFriendIndex, setToggledFriendIndex] = useState(-1);
  const totalExpense = friendList.reduce((acc, friend) => {
    return acc + friend.expense;
  }, 0);
  const [calculated, setCalculated] = useState(totalExpense);

  const FriendsExpenses = (props : {friendList:any}) => {
  
    const editParticipants = (index: number) => {
      if (participants[index]) {
        if (participants.filter((p) => p == true).length === 1) {
          alert("한 명 이상이 선택되어야 합니다.");
          return;
        }
      }
      const updatedParticipants = [...participants];
      updatedParticipants[index] = !participants[index];
      setParticipants(updatedParticipants);
      setToggledFriendIndex(index);
    };
  
    const handleExpenseChange = (value:number, index:number) => {
      if (participants[index]) {
        console.log(value, index);
        const updatedExpenses = [...showExpenses];
        updatedExpenses[index] = value;
        let sum = updatedExpenses.reduce((acc,b) => Number(acc)+Number(b));
        console.log("sum", sum)
        setCalculated(Number(sum).toFixed(2) as unknown as number);
        setExpenses(updatedExpenses);
        console.log(updatedExpenses);
        setShowExpenses(updatedExpenses);
      }
    };
  
    useEffect(() => {
      if (toggledFriendIndex !== -1) {
        const participatingFriends = participants.filter((participant) => participant);
        const totalParticipants = participatingFriends.length;
        const distributedExpense = totalExpense / totalParticipants;

        const updatedExpenses = expenses.map((expense, i) => {
          if (participants[i]) {
            return distributedExpense;
          } else {
            return 0; 
          }
        });
        const updatedShowExpenses = expenses.map((expense, i) => {
          if (participants[i]) {
            return distributedExpense.toFixed(2)
          } else {
            return 0; 
          }
        });
        //실제 서버로 보낼 값에 대한 합계
        let calculation = updatedExpenses.reduce((acc, a) => acc+a)
        setCalculated(calculation)
        console.log(calculated);

        if (updatedExpenses) {
          setExpenses(updatedExpenses);
          setShowExpenses(updatedShowExpenses);
        }
        console.log("update", updatedExpenses);
        console.log(showExpenses);
        setToggledFriendIndex(-1);
      }
    }, [participants, toggledFriendIndex, calculated]);
  
    return (
      <View style={tw`flex-1 p-4 justify-center`}>
        {friendList.map((friend, index) => (
          <View key={index} style={tw`flex-row items-center mb-4`}>
            <Text style={tw`flex-1 text-lg font-bold text-[#333]`}>
              {friend.name}
            </Text>
            <TextInput
              editable={participants[index]}
              style={tw`flex-1 h-10 border border-gray-400 rounded px-2`}
              value={showExpenses[index].toString()}
              onChangeText={(value) => handleExpenseChange(value, index)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                tw`w-9 h-7 rounded-full flex items-center justify-center ml-2`,
                participants[index]
                  ? tw`bg-[#7459d9]/80`
                  : tw`bg-transparent border-[0.3] border-[#7459d9]`
              ]}
              onPress={() => editParticipants(index)}
            >
              <Text style={tw`text-white`}>{participants[index] ? '✓' : ''}</Text>
            </TouchableOpacity>
          </View>
        ))}
    <View>
    <View style={tw `items-center p-3 px-7 bg-[#7459d9]/10 rounded-2`}>
        <View style={tw `flex-row mb-2`}>
          <Text style={tw `font-bold`} >실제 지출</Text>
          <View style={tw `w-10`}></View>
          <Text style={tw `font-bold text-[#443]`} >{totalExpense} 원</Text>
        </View>

        <View style={tw `flex-row `}>
          <Text style={tw `font-bold text-[#7459d9]`} >입력한 합계</Text>
          <View style={tw `w-6.5`}></View>
          <Text style={tw `font-bold text-[#7459d9]`} >{calculated} 원</Text>
        </View>
    </View>
    </View>
  </View>
  )
  };

  const [img, setImg] = useState(imageSource);
  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri)
    } else {
    }
  }
  const handleSave = () => {
    if(calculated > totalExpense + 0.1 || calculated < totalExpense-0.1){
      alert("실제 지출과 입력한 합계가 다릅니다.\n (오차범위 0.1까지 허용)")
    }
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={tw`mt-10 p-7 mb-10 flex-1`}>
    <ScrollView style={tw `flex-1`}>
    <View style={tw `flex-1 items-center p-3 justify-center rounded-3 mb-7 bg-[#E4E0F0]`}>
    <Text style={tw `font-bold text-base`}>{expenseTitle}</Text>
    <Text style={tw `font-bold text-2xl`}>{expense}</Text>
    </View>
      {/* 메모 */}
      <View style={tw `flex-1`}>
        <Text style={tw `font-bold`}>메모 남기기</Text>
        <TextInput 
          style={[
            tw`h-13 px-3 mb-5`,
            { borderBottomWidth: 0.6, borderBottomColor: '#444' },
          ]}
        >{detailData?.memo}</TextInput>
      </View>

      <View style={tw `flex-1`}>
      <Text style={tw `font-bold`}>카테고리</Text>
      <ScrollView horizontal={true} contentContainerStyle={tw`flex-row mt-4`}>
          {categoryIcons.map((icon, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(index)}
              style={[
                tw`h-14 w-14 rounded-2 m-1`,
                {
                  backgroundColor: '#ddd',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: selectedCategory === index ? 2 : 0, 
                  borderColor: '#7B5AF3', 
                },
              ]}
            >
              {icon}
              <Text style={tw `mt-[1] text-xs`}>{categoryLabels[index]}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
    </View>


    <View style={tw `flex-1`}>
      <Text style={tw `mb-4 mt-4 font-bold`}>사진 등록(선택)</Text>

        <TouchableOpacity onPress={pickImage}>
          <ImageViewer
              placeholderImageSource={imageSource? imageSource : PlaceholderImage}
              selectedImage={img}
            />
        </TouchableOpacity>
    </View>




    <View style={tw `flex-1 mt-5`}>
      <Text style={tw `mb-4 font-bold`}>지출에 참여한 동행</Text>
        <FriendsExpenses></FriendsExpenses>
    </View>
        
      {/* <Text>{expenseTitle}</Text>
      <Text>{date}</Text>
      <Text>{expense}</Text> */}
      {/* Add more details as needed */}
    </ScrollView>
      <TouchableOpacity onPress={handleSave} style={tw `p-2 bg-[#7B5AF3]/100 rounded-2 items-center mx-15 mt-2`}>
        <Text style={tw `text-base font-bold text-white`}>저장하기</Text>
       </TouchableOpacity>
    </KeyboardAvoidingView>
  );
  
 
  





};


export default ExpenseDetail;
