import { Image, Text, View } from 'react-native';
import React from 'react';
import images from '@/src/core/constants/images';

const EmptyState = ({title}: {title?: string}) => {
  return (
    <View className="w-full flex justify-center items-center gap-y-[24px]">
      <Image source={images.emptyState} alt="No data found" height={215} width={220} className="size-[120px] object-contain object-center"/>
      <Text className="text-white font-urbanist-bold text-[14px]">{title ? title : 'No data found'}</Text>
    </View>
  );
};
export default EmptyState;
