import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/form/field-input';
import Button from '@/src/shared/presentation/form/button';
import PasswordFieldInput from '@/src/shared/presentation/form/password-input';

const ResetPasswordScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
      <View className="flex flex-col justify-between items-center h-full w-full">
        <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28}/>
          </TouchableOpacity>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
            <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
              <Text className="font-urbanist-bold text-[30px] text-white">Create New Password 🔒</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">
                Create your new password. If you forget it, then you have to do forgot password.
              </Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <PasswordFieldInput label="New Password" placeholder="Enter new password" value="" onChange={(value) => console.log(value)} />
            <PasswordFieldInput label="Confirm New Password" placeholder="Renter new password" value="" onChange={(value) => console.log(value)} />
          </View>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button onPress={() => router.push('/otp')} label="Continue" type="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ResetPasswordScreen;
