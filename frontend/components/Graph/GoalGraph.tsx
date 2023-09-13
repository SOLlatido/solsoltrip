import React from 'react'
import {PieChart} from 'react-native-gifted-charts'
function GoalGraph(props : {data}) {
  return (
    <PieChart
    donut
    showText
    innerCircleColor="#DBE4E1"
    innerRadius={65}
    textColor="#fff"
    radius={100}
    textSize={15}
    textBackgroundRadius={26}
    data={props.data}
    semiCircle
    />
  )
}

export default GoalGraph