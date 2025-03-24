import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { ChevronRight, Handshake, LogOut, MessagesSquare, Shield, Siren, UserRound, Zap } from 'lucide-react-native';

const AccountScreen = () => {
  const user = useAuthState((state) => state.user)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#25cb96' }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerClassName="w-full flex flex-col justify-start items-start min-h-[80vh] gap-y-[42px]">
        <View className="flex flex-col justify-center items-center w-full gap-y-[20px] h-[20vh]">
          <View className="rounded-full bg-alternative w-[100px] h-[100px] flex justify-center items-center">
            <Text className="text-white font-urbanist-bold text-[48px]">{user?.name.charAt(0)}</Text>
          </View>
          <Text className="text-white font-urbanist-bold text-[24px]">{user?.name}</Text>
        </View>
        <View className="relative flex flex-col justify-start items-center w-full gap-y-[24px] bg-primary h-[90vh]">
          <View className="absolute -top-10 z-40 flex flex-col justify-start items-start w-full gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
            <Text className="text-white font-urbanist-bold text-[22px]">Account</Text>
            <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <UserRound color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">Profile</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <Shield color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">Security</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
            </View>
          </View>
          <View className="absolute top-[160px] z-40  flex flex-col justify-start items-start w-full gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
            <Text className="text-white font-urbanist-bold text-[22px]">Support</Text>
            <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <MessagesSquare color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">Help & Support</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <Zap color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">What's new?</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
            </View>
          </View>
          <View className="absolute top-[360px] z-40  flex flex-col justify-start items-start w-full gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
            <Text className="text-white font-urbanist-bold text-[22px]">Miscellaneous</Text>
            <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <Handshake color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">Terms of use</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
              <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <Siren color="white" />
                  <Text className="text-white font-urbanist-normal text-[16px]">Privacy Policy</Text>
                </View>
                <ChevronRight color="white" />
              </Pressable>
            </View>
          </View>
          <View className="absolute top-[560px] z-40  flex flex-col justify-start items-start w-full gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
            <Pressable onPress={() => console.log('Profile')} className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row justify-start items-center gap-x-[8px]">
                <LogOut color="#FF2C2C" />
                <Text className="text-[#FF2C2C] font-urbanist-normal text-[16px]">Log Out</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
