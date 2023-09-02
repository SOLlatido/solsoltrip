import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const LongButton = (props:{content:string}) => {
  const content:string = props.content
  return (
    <View>
      <Pressable
        style={s.container}
        onPress={()=>{console.warn("hello")}}
      ></Pressable>
      <Text style={s.text}>시작하기</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container : {
    width:"100%",
    padding : 10,
  },
  button : {
    backgroundColor : "#fff",
    height : 50,
    borderRadius : 15,
    justifyContent : "center",
    alignItems : "center",
  },
  text : {
    fontSize : 20,
    fontWeight : '500'
  }
})

export default LongButton