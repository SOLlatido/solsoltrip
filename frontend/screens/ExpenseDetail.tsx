import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import ImagePicker from 'react-native-image-picker';
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
  const FriendsExpenses = () => {
    const friendsList = ['석다영', '신산하', '이승현', '김민식'];
    const [selectedNames, setSelectedNames] = useState(friendsList);
    const [expenses, setExpenses] = useState({});

    console.log(expenses);
    const defaultExpense = 32000; // You can set your desired default expense here
    const handleExpenseChange = (friendName, value) => {
        if (selectedNames.includes(friendName)) {
          setExpenses({ ...expenses, [friendName]: value });
        } else {
          setExpenses({ ...expenses, [friendName]: '0' }); // Set the expense to 0 when the circle is empty
        }
      };
    // const handleExpenseChange = (friendName, value) => {
    // if (selectedNames.includes(friendName)) {
    //     setExpenses({ ...expenses, [friendName]: value });
    //     } else {
    //     setExpenses({ ...expenses, [friendName]: '0' });
    //     }
    //     console.log(expenses)
    // };

    const toggleFriendSelection = (friendName) => {
        if (selectedNames.includes(friendName)) {
            // If the friend is already selected, remove them
            setSelectedNames(selectedNames.filter((name) => name !== friendName));
          } else {
            // If the friend is not selected, add them
            setSelectedNames([...selectedNames, friendName]);
          }
    };
        
    useEffect(() => {
        const divided = (defaultExpense / selectedNames.length).toString()
        friendsList.forEach((friendName) => {
            if(selectedNames.includes(friendName)){
                handleExpenseChange(friendName, divided)
            } else {
                handleExpenseChange(friendName, "0")
            }
        })
        // friendsList.forEach((friendName) => {
        //   const value = expenses[friendName] || (defaultExpense / selectedNames.length).toString();
        //   handleExpenseChange(friendName, value);
        // });
      }, [selectedNames]);
  
    return (
      <View >
        {friendsList.map((friendName) => (
          <View key={friendName} style={tw`flex-row justify-between items-center mb-3`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-base mr-4`}>{friendName}</Text>
              <TextInput
                style={tw`w-40 border-[0.3] border-[#ddd] rounded-2 h-13 px-3`}
                onChangeText={(value) => handleExpenseChange(friendName, value)}
                value={expenses[friendName] ? expenses[friendName].toString() : (defaultExpense / selectedNames.length).toString()}
                keyboardType="numeric"
              />
            </View>
            <View style={tw`flex-row items-center`}>
              <View
                style={[
                  tw`w-6 h-6 ml-2 rounded-full border-[0.5] border-[#999]`,
                  { backgroundColor: selectedNames.includes(friendName) ? 'purple' : 'transparent' },
                ]}
                onTouchEnd={() => toggleFriendSelection(friendName)}
              />
            </View>
          </View>
        ))}
      </View>
    );
  };

//   이미지 렌더링하는 함수
const selectImage = () => {
    const options = {
    //   mediaType: 'photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, (response?) => {
        if(response?.assets) {
            if (!response.didCancel && response.assets.length > 0) {
              // If an image is selected, set it as the new image source
              setImg({ uri: response.assets[0].uri });
            } 
        }
    });
  };
  const [img, setImg] = useState(imageSource);

  return (
    <ScrollView style={tw `mt-10 p-7 mb-10 flex-1`}>
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
      {/* 카테고리 */}
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
                  borderWidth: selectedCategory === index ? 2 : 0, // Add a strong purple border for the selected category
                  borderColor: '#7B5AF3', // Purple border color
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
      <TouchableOpacity onPress={selectImage}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: 100, height: 100 }} // Set the appropriate style for the image
        />
      ) : (
        
        <View style={tw `w-30 h-30 bg-gray-300 justify-center items-center rounded-2`}>
            <Text style={tw `text-white text-2xl font-bold`}>+</Text>
        </View>
      )}
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
  );
  
  





};

export default ExpenseDetail;
