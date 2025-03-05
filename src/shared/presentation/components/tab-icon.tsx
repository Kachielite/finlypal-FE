import { Text, View } from 'react-native';
import { LucideProps } from 'lucide-react-native';
import React from 'react';

type TabIconProps = {
  focused: boolean;
  icon: React.ElementType<LucideProps>;
  title: string;
}

const TabIcon = ({focused, icon: Icon, title}: TabIconProps) => {
  return (
    <View className="flex flex-col justify-start items-center gap-y-1">
      <Icon size={24} color={focused ? "#17CE92" : "#FFFFFF"} />
      <Text className={`font-urbanist-bold text-xs ${focused ? 'text-secondary font-medium' : 'text-white'}`}>
        {title}
      </Text>
    </View>
  );
};
export default TabIcon;
