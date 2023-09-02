import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const LongButton = (props:{content:string}) => {
  const content:string = props.content
  return (
    <View style={s.container}>
      <Pressable
        style={s.button}
        onPress={()=>{console.warn("hello")}}
      >
      <Text style={s.text}>{content}</Text>
      </Pressable>
    </View>
  )
}

const s = StyleSheet.create({
  container : {
    flex:1,
    padding:20,
    width : "100%"
  },
  button : {
    backgroundColor : "#7B5AF3",
    height : 50,
    borderRadius : 15,
    justifyContent : "center",
    alignItems : "center",
  },
  text : {
    fontSize : 20,
    fontWeight : '500',
    color : "#fff"
  }
})

export default LongButton