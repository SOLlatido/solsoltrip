// import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { Colors } from 'react-native/Libraries/NewAppScreen'

// const LongButton = (props:{content:string}) => {
//   const content:string = props.content
//   return (
//     <View style={s.container}>
//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={s.button}
//         onPress={()=>{console.warn("hello")}}
//       >
//       <Text style={s.text}>{content}</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const s = StyleSheet.create({
//   container : {
//     flex:1,
//     padding:20,
//     width : "100%"
//   },
//   button : {
//     backgroundColor : "#7B5AF3",
//     height : 50,
//     borderRadius : 15,
//     justifyContent : "center",
//     alignItems : "center",
//   },
//   text : {
//     fontSize : 20,
//     fontWeight : '500',
//     color : "#fff"
//   }
// })

// export default LongButton

import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc'; // Import the tw function

const LongButton = (props: { content: string }) => {
  const content: string = props.content;
  return (
    <View style={tw `flex-1 p-4 w-full items-center`}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw`w-6/7 bg-[#7B5AF3] h-12 rounded-[4] justify-center items-center `}
        onPress={() => {
          console.warn(`hello`);
        }}
      >
        <Text style={tw `text-white text-lg font-semibold`}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LongButton;
