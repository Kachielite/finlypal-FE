import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { ArrowLeft, Banknote } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/components/form/field-input';

import Button from '@/src/shared/presentation/components/form/button';
import useAccount from '@/src/feature/account/presentation/state/useAccount';
import SelectInput, { SelectInputData } from '@/src/shared/presentation/components/form/select-input';
import { useAccountState } from '@/src/feature/account/presentation/state/accountState';

const ProfileScreen = () => {

  const isModifyingUser = useAccountState((state) => state.isModifyingUser);
  const {userUpdate, formattedCurrencies, updateUserHandler} = useAccount();

  return (
    <SafeAreaView className="bg-primary h-full w-screen">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex flex-col justify-between items-center h-full w-full">
              <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px] gap-y-[40px]">
                <View className="flex flex-row justify-between items-center w-full">
                  <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft color="white" size={28} />
                  </TouchableOpacity>
                  <Text className="text-white font-urbanist-bold text-[24px]">Profile Settings</Text>
                  <View/>
                </View>
                <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
                  <FieldInput
                    iconType="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={userUpdate.watch("name") as string}
                    onChangeText={(text) => userUpdate.setValue("name", text, { shouldValidate: true })}
                    error={userUpdate.formState.errors.name?.message}
                  />
                  <SelectInput
                    data={formattedCurrencies}
                    label="Currency"
                    placeholder="Select your currency"
                    value={userUpdate.watch("currency") || null}
                    onChangeText={(value) => userUpdate.setValue("currency", value as SelectInputData, { shouldValidate: true })}
                    icon={<Banknote color="#9E9E9E" size={24}/>}
                    error={userUpdate.formState.errors.currency?.message}
                  />

                </View>
              </View>
              <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
                <Button onPress={updateUserHandler} label="Save" type="primary" isLoading={isModifyingUser} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default ProfileScreen;
