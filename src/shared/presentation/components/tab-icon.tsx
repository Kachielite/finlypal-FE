import { View } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import React from 'react';

type TabIconProps = {
  focused: boolean;
  icon: React.ElementType<LucideProps>;
}

const TabIcon = ({focused, icon: Icon}: TabIconProps) => {
  return (
    <View className="flex flex-col justify-center items-center gap-y-1 flex-shrink-0 w-[48px]">
      <Icon size={24} color={focused ? "#17CE92" : "#FFFFFF"} />
      {/*<Text className={`font-urbanist-bold text-xs text-center ${focused ? 'text-secondary font-medium' : 'text-white'}`}>*/}
      {/*  {title}*/}
      {/*</Text>*/}
    </View>
  );
};
export default TabIcon;
