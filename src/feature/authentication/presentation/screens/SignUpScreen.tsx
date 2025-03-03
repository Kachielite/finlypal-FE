import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/form/field-input';
import PasswordFieldInput from '@/src/shared/presentation/form/password-input';
import Button from '@/src/shared/presentation/form/button';
import CheckBox from '@/src/shared/presentation/form/checkbox';

const SignUpScreen = () => {
  const [isChecked, setChecked] = useState(true);
  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
      <View className="flex flex-col justify-between items-center h-full w-full">
        <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28}/>
          </TouchableOpacity>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
            <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
              <Text className="font-urbanist-bold text-[32px] text-white">Hello there 👋</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">Please enter your email & password to create an account.</Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <FieldInput id="name" type="name" label="Name" placeholder="Enter your name" value="" onChange={(value) => console.log(value)} />
            <FieldInput id="email" type="email" label="Email" placeholder="Enter your email" value="" onChange={(value) => console.log(value)} />
            <PasswordFieldInput label="Password" placeholder="Enter your password" value="" onChange={(value) => console.log(value)} />
            <View className="flex flex-row justify-start items-center w-full gap-x-[8px] mt-7">
              <CheckBox
                onChange={setChecked}
                isChecked={isChecked}
              />
              <View className="flex flex-row justify-start items-center gap-x-1">
                <Text className="text-white font-urbanist-regular text-[16px]">I agree to FinlyPal's</Text>
                <TouchableOpacity onPress={() => console.log('Terms and conditions')}>
                  <Text className="text-secondary font-urbanist-bold text-[16px]">Terms and conditions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View className="w-full py-[20px] flex flex-row justify-center items-center">
          <Text className="text-white font-urbanist-medium text-[16px]">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/sign-in')}>
            <Text className="text-secondary font-urbanist-bold text-[16px] ml-[8px]">Log in</Text>
          </TouchableOpacity>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button onPress={() => router.push('/sign-up')} label="Continue" type="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUpScreen;
