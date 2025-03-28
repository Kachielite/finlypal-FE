import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { ChevronRight, Handshake, LogOut, MessagesSquare, Shield, Siren, UserRound } from 'lucide-react-native';
import { router } from 'expo-router';
import useAccount from '@/src/feature/account/presentation/state/useAccount';
import AppModal from '@/src/shared/presentation/components/app-modal';
import { Modalize } from 'react-native-modalize';

const AccountScreen = () => {
  const user = useAuthState((state) => state.user);
  const {openEmailApp} = useAccount();

  const logOutModal = useRef<Modalize>(null);

  const openWebView = (url: string) => router.push({pathname: '/web-view', params: {url}});

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="w-full flex flex-col justify-start items-start min-h-[80vh] gap-y-[42px]">
          <View className="flex flex-col justify-center items-center w-full gap-y-[20px] h-[20vh]">
            <View className="rounded-full bg-alternative w-[100px] h-[100px] flex justify-center items-center">
              <Text className="text-white font-urbanist-bold text-[48px]">{user?.name.charAt(0)}</Text>
            </View>
            <Text className="text-white font-urbanist-bold text-[24px]">{user?.name}</Text>
          </View>
          <View className="flex flex-col justify-start items-center w-full gap-y-[24px] bg-primary h-[90vh]">
            <View className="flex flex-col justify-start items-start gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
              <Text className="text-white font-urbanist-bold text-[22px]">Account</Text>
              <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
                <TouchableOpacity onPress={() => router.push('/account/profile')} className="flex flex-row justify-between items-center w-full">
                  <View className="flex flex-row justify-start items-center gap-x-[8px]">
                    <UserRound color="white" />
                    <Text className="text-white font-urbanist-normal text-[16px]">Profile</Text>
                  </View>
                  <ChevronRight color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/account/security')} className="flex flex-row justify-between items-center w-full">
                  <View className="flex flex-row justify-start items-center gap-x-[8px]">
                    <Shield color="white" />
                    <Text className="text-white font-urbanist-normal text-[16px]">Security</Text>
                  </View>
                  <ChevronRight color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-col justify-start items-start  gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
              <Text className="text-white font-urbanist-bold text-[22px]">Support</Text>
              <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
                <TouchableOpacity onPress={openEmailApp} className="flex flex-row justify-between items-center w-full">
                  <View className="flex flex-row justify-start items-center gap-x-[8px]">
                    <MessagesSquare color="white" />
                    <Text className="text-white font-urbanist-normal text-[16px]">Help & Support</Text>
                  </View>
                  <ChevronRight color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-col justify-start items-start gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
              <Text className="text-white font-urbanist-bold text-[22px]">Miscellaneous</Text>
              <View className="flex flex-col justify-start items-start w-full gap-y-[24px]">
                <TouchableOpacity onPress={() => openWebView("https://docs.google.com/document/d/1XmVgprxEJDmW-wQOL3Gl8qlbAOB17K1MlLJX3-rBsLE/view")} className="flex flex-row justify-between items-center w-full">
                  <View className="flex flex-row justify-start items-center gap-x-[8px]">
                    <Handshake color="white" />
                    <Text className="text-white font-urbanist-normal text-[16px]">Terms of use</Text>
                  </View>
                  <ChevronRight color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openWebView("https://docs.google.com/document/d/1XmVgprxEJDmW-wQOL3Gl8qlbAOB17K1MlLJX3-rBsLE/view")} className="flex flex-row justify-between items-center w-full">
                  <View className="flex flex-row justify-start items-center gap-x-[8px]">
                    <Siren color="white" />
                    <Text className="text-white font-urbanist-normal text-[16px]">Privacy Policy</Text>
                  </View>
                  <ChevronRight color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-col justify-start items-start gap-y-[24px] bg-alternative w-[86vw] rounded-[16px] px-[20px] py-[20px] shadow-sm">
              <TouchableOpacity onPress={() => logOutModal.current?.open()} className="flex flex-row justify-between items-center w-full">
                <View className="flex flex-row justify-start items-center gap-x-[8px]">
                  <LogOut color="#FF2C2C" />
                  <Text className="text-[#FF2C2C] font-urbanist-normal text-[16px]">Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text className="text-white font-urbanist-normal text-[16px]">v 0.0.1</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <AppModal
        modalizeRef={logOutModal}
        title="Log Out"
        description="Are you sure you want to log out of your account?"
        proceedAction={() => {
          useAuthState.getState().logout();
          router.replace('/authentication/welcome');
        }}
        proceedButtonLabel="Logout"
        includeTabPadding
      />
    </>
  );
};

export default AccountScreen;
