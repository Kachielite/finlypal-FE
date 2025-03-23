import { Image, Text, View } from 'react-native';
import React from 'react';
import images from '@/src/core/constants/images';

const EmptyState = ({title, description}: {title?: string, description?: string}) => {
  return (
    <View className="w-full flex justify-center items-center gap-y-[10px]">
      <Image source={images.emptyState} alt="No data found" height={215} width={220} className="size-[120px] object-contain object-center mb-10"/>
      <Text className="text-white font-urbanist-bold text-[18px]">{title ? title : 'No data found'}</Text>
      {description && <Text className="text-white font-urbanist-normal text-[14px]">{description}</Text>}
    </View>
  );
};
export default EmptyState;
