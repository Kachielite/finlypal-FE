import { Text, View } from 'react-native';
import React from 'react';

const CategoryCard = ({category, amount, color}:{category:string, amount:string, color:string}) => {
  return (
    <View
      style={{backgroundColor: color}}
      className="p-4 rounded-2xl w-32 flex justify-center items-start shadow-md gap-y-[20px] py-7">
      <Text className="text-white text-md mt-1">{category}</Text>
      <Text className="text-white font-bold text-xl">{amount}</Text>
    </View>
  );
};
export default CategoryCard;
