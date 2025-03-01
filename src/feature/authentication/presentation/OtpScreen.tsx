import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Button from '@/src/shared/presentation/form/button';
import { OtpInput } from 'react-native-otp-entry';

const OtpScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
      <View className="flex flex-col justify-between items-center h-full w-full">
        <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28}/>
          </TouchableOpacity>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
            <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
              <Text className="font-urbanist-bold text-[32px] text-white">OTP code verification 🔐</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">
                We have sent an OTP code to your email. Enter the OTP code below to verify.
              </Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <OtpInput
              focusColor="#17CE92"
              numberOfDigits={4} onTextChange={(text) => console.log(text)}
              theme={{
                pinCodeContainerStyle:{borderRadius: 16, borderWidth: 1, borderColor: '#9E9E9E', backgroundColor: '#1F222A', width: 70, height: 70, justifyContent: 'center', alignItems: 'center'},
                pinCodeTextStyle: {fontSize: 24, color: 'white', fontWeight: 'bold'},
                filledPinCodeContainerStyle: {backgroundColor: '#1F222A', borderRadius: 16, borderWidth: 1, borderColor: '#35383F', width: 70, height: 70, justifyContent: 'center', alignItems: 'center'},
                focusedPinCodeContainerStyle: {backgroundColor: '#1F222A', borderRadius: 16, borderWidth: 1, borderColor: '#17CE92', width: 70, height: 70, justifyContent: 'center', alignItems: 'center'}
              }}
            />
            <View className="flex flex-row justify-start items-center w-full gap-x-[8px] mt-7">
              <View className="flex justify-center items-center w-full">
                <TouchableOpacity onPress={() => router.push('/request-reset-password')}>
                  <Text className="text-white font-urbanist-medium text-[18px]">Didn't receive email?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text className="text-white font-urbanist-medium text-[18px] mt-10">You can resend code in 55 s</Text>
          </View>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button onPress={() => router.push('/reset-password')} label="Continue" type="primary" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default OtpScreen;
