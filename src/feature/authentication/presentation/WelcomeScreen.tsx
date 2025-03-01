import { Text, SafeAreaView, View, Image, StatusBar } from 'react-native';
import React from 'react';
import images from '@/src/core/constants/images';
import Button from '@/src/shared/presentation/button';

const WelcomeScreen = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="bg-primary h-screen w-screen">
        <View className="h-full w-full flex justify-center items-center px-[24px]">
          <Image
            source={images.logo}
            className="w-[140px] h-[140px] object-contain"
          />
          <View className="flex flex-col justify-start items-center my-[77.61px] gap-y-4 leading-10">
            <Text className="font-urbanist-bold text-[40px] text-white">Welcome to</Text>
            <Text className="font-urbanist-bold text-[40px] text-[#17CE92]">FinlyPal 👋</Text>
          </View>
          <View className="flex flex-col justify-start items-center gap-y-[24px]  w-full">
            <Button onPress={() => {}} label="Log in" />
            <Button onPress={() => {}} label="Sign up" type="secondary" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
export default WelcomeScreen;
