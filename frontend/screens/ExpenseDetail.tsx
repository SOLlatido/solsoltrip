import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import tw from "twrnc";
import * as ImagePicker from 'expo-image-picker';
import PlaceholderImage from "../assets/images/sol_expense_large.png"
import ImageViewer from '../components/Accounts/ImageViewer';

import { MaterialIcons, FontAwesome, Feather, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
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
  const FriendsExpenses = (props : {friendList:any}) => {
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
    const totalExpense = 32000;
  
    const editParticipants = (index: number) => {
      if (participants[index]) {
        if (participants.filter((p) => p == true).length === 1) {
          alert("한 명 이상이 선택되어야 합니다.");
          return;
        }
      }
      console.log(participants.filter((p) => p == true).length);
      const updatedParticipants = [...participants];
      updatedParticipants[index] = !participants[index];
      setParticipants(updatedParticipants);
      setToggledFriendIndex(index);
    };
  
    const handleExpenseChange = (value, index) => {
      if (participants[index]) {
        // Only update the expenses if the friend is participating
        const updatedExpenses = [...expenses];
        updatedExpenses[index] = value;
        setExpenses(updatedExpenses);
        setShowExpenses(updatedExpenses);
      }
    };
  
    useEffect(() => {
      if (toggledFriendIndex !== -1) {
        const participatingFriends = participants.filter((participant) => participant);
        const totalParticipants = participatingFriends.length;
        const distributedExpense = totalExpense / totalParticipants;
        console.log(distributedExpense);
        const updatedExpenses = expenses.map((expense, i) => {
          if (participants[i]) {
            return distributedExpense;
          } else {
            return 0; // Keep the original value for non-participating friends
          }
        });
        if (updatedExpenses) {
          setExpenses(updatedExpenses);
          setShowExpenses(updatedExpenses);
        }
        console.log(updatedExpenses);
        console.log(showExpenses);
        setToggledFriendIndex(-1);
      }
    }, [participants, toggledFriendIndex]);
  
    return (
      <View style={tw`flex-1 p-4 justify-center`}>
        {friendList.map((friend, index) => (
          <View key={index} style={tw`flex-row items-center mb-4`}>
            <Text style={tw`flex-1 text-lg font-bold text-[#555]`}>
              {friend.name}
            </Text>
            <TextInput
              editable={participants[index]} // Make the input editable only for participating friends
              style={tw`flex-1 h-10 border border-gray-400 rounded px-2`}
              value={showExpenses[index].toString()}
              onChangeText={(value) => handleExpenseChange(value, index)}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={[
                tw`w-9 h-7 rounded-full flex items-center justify-center ml-2`,
                participants[index]
                  ? tw`bg-[#8273BE]`
                  : tw`bg-transparent border-[0.3] border-[#8273BE]`
              ]}
              onPress={() => editParticipants(index)}
            >
              <Text style={tw`text-white`}>{participants[index] ? '✓' : ''}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );





    // const friendsList = ['석다영', '신산하', '이승현', '김민식'];
    // const [selectedNames, setSelectedNames] = useState(friendsList);
    // const defaultExpense = 32000; // You can set your desired default expense here
    // const initialExpenses = friendsList.reduce((acc, friendName) => {
    //   acc[friendName] = defaultExpense / friendsList.length;
    //   return acc;
    // }, {});
    // const [shouldRenderInput, setShouldRenderInput] = useState(false);
    // // const [expenses, setExpenses] = useState(initialExpenses)
    // const [expenses, setExpenses] = useState(() => {
    //   const dividedExpense = defaultExpense / friendsList.length;
    //   const initialExpenses = {};
    //   friendsList.forEach((friendName) => {
    //     initialExpenses[friendName] = dividedExpense;
    //   });
    //   return initialExpenses;
    // });
    // const handleExpenseChange = (friendName, value) => {
    //     if (selectedNames.includes(friendName)) {
    //       setExpenses({ ...expenses, [friendName]: value });
    //     } else {
    //       setExpenses({ ...expenses, [friendName]: '0' }); // Set the expense to 0 when the circle is empty
    //     }
    //   };

    // const toggleFriendSelection = (friendName) => {
    //     if (selectedNames.includes(friendName)) {
    //         // If the friend is already selected, remove them
    //         setSelectedNames(selectedNames.filter((name) => name !== friendName));
    //       } else {
    //         // If the friend is not selected, add them
    //         setSelectedNames([...selectedNames, friendName]);
    //       }
    // };
        
    // useEffect(() => {
    //     const divided = (defaultExpense / selectedNames.length).toString()
    //     console.log(selectedNames);
    //     friendsList.forEach((friendName) => {
    //         if(selectedNames.includes(friendName)){
    //             handleExpenseChange(friendName, divided)
    //         } else {
    //             handleExpenseChange(friendName, "0")
    //         }
    //     })
 
    //     setShouldRenderInput(true);
    //     console.log(expenses);
    //   }, [selectedNames]);
  
    // return (
    //   <View >
    //     {friendsList.map((friendName) => (
    //       <View key={friendName} style={tw`flex-row justify-between items-center mb-3`}>
    //         <View style={tw`flex-row items-center`}>
    //           <Text style={tw`text-base mr-4`}>{friendName}</Text>
    //           {shouldRenderInput && (
    //           <TextInput
    //             style={tw`w-40 border-[0.3] border-[#ddd] rounded-2 h-13 px-3`}
    //             onChangeText={(value) => handleExpenseChange(friendName, value)}
    //             value={expenses[friendName].toString()}
    //             keyboardType="numeric"
    //           />
    //         )}
    //         </View>
    //         <View style={tw`flex-row items-center`}>
    //           <View
    //             style={[
    //               tw`w-6 h-6 ml-2 rounded-full border-[0.5] border-[#999]`,
    //               { backgroundColor: selectedNames.includes(friendName) ? 'purple' : 'transparent' },
    //             ]}
    //             onTouchStart={() => 
    //               toggleFriendSelection(friendName)
    //             }
    //           />
    //         </View>
    //       </View>
    //     ))}
    //   </View>
    // );
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
        >{memo}</TextInput>
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
      <TouchableOpacity style={tw `p-2 bg-[#7B5AF3]/100 rounded-2 items-center mx-15 mt-2`}>
        <Text style={tw `text-base font-bold text-white`}>저장하기</Text>
       </TouchableOpacity>
    </KeyboardAvoidingView>
  );
  
  





};

export default ExpenseDetail;
