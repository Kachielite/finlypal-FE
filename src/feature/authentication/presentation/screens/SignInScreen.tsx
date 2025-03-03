import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/form/field-input';
import PasswordFieldInput from '@/src/shared/presentation/form/password-input';
import Button from '@/src/shared/presentation/form/button';

const SignInScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
      <View className="flex flex-col justify-between items-center h-full w-full">
        <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28}/>
          </TouchableOpacity>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
            <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
              <Text className="font-urbanist-bold text-[32px] text-white">Welcome back 👋</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">Please enter your email & password to log in.</Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <FieldInput type="email" label="Email" placeholder="Enter your email" value="" onChange={(value) => console.log(value)} />
            <PasswordFieldInput label="Password" placeholder="Enter your password" value="" onChange={(value) => console.log(value)} />
            <View className="flex flex-row justify-start items-center w-full gap-x-[8px] mt-7">
              <View className="flex justify-center items-center w-full">
                <TouchableOpacity onPress={() => router.push('/request-reset-password')}>
                  <Text className="text-secondary font-urbanist-bold text-[16px]">Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="w-full py-[20px] flex flex-row justify-center items-center">
          <Text className="text-white font-urbanist-medium text-[16px]">Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')}>
            <Text className="text-secondary font-urbanist-bold text-[16px] ml-[8px]">Sign up</Text>
          </TouchableOpacity>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button onPress={() => router.push('/sign-up')} label="Continue" type="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignInScreen;
