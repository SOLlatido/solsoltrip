import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import tw from 'twrnc';

const ExpenseItem = () => {
  return (
    <TouchableOpacity style={tw.style('rounded-2 h-15 flex-row')}>
      <View style={tw.style('flex-1')}>
        {/* Content for the first view */}
        <Text>View 1</Text>
      </View>
      <View style={tw.style('flex-2')}>
        {/* Content for the second view */}
        <Text>View 2</Text>
      </View>
      <View style={tw.style('flex-2')}>
        {/* Content for the third view */}
        <Text>View 3</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseItem;
