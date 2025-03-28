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
import { ArrowLeft } from 'lucide-react-native';

import Button from '@/src/shared/presentation/components/form/button';
import useAccount from '@/src/feature/account/presentation/state/useAccount';
import { useAccountState } from '@/src/feature/account/presentation/state/accountState';
import PasswordFieldInput from '@/src/shared/presentation/components/form/password-input';

const SecurityScreen = () => {

  const isModifyingUser = useAccountState((state) => state.isModifyingUser);
  const {userResetPassword, updateUserPasswordHandler} = useAccount();

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
                  <Text className="text-white font-urbanist-bold text-[24px]">Security Settings</Text>
                  <View/>
                </View>
                <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
                  <PasswordFieldInput
                    label="Current password"
                    placeholder="Enter currenct password"
                    value={userResetPassword.watch("old_password")}
                    onChangeText={(text) =>  userResetPassword.setValue("old_password", text, { shouldValidate: true })}
                    error={userResetPassword.formState.errors.old_password?.message}
                  />
                  <PasswordFieldInput
                    label="New password"
                    placeholder="Enter new password"
                    value={userResetPassword.watch("new_password")}
                    onChangeText={(text) =>  userResetPassword.setValue("new_password", text, { shouldValidate: true })}
                    error={userResetPassword.formState.errors.new_password?.message}
                  />
                  <PasswordFieldInput
                    label="Confirm new password"
                    placeholder="Enter new password"
                    value={userResetPassword.watch("confirmPassword")}
                    onChangeText={(text) =>  userResetPassword.setValue("confirmPassword", text, { shouldValidate: true })}
                    error={userResetPassword.formState.errors.confirmPassword?.message}
                  />
                </View>
              </View>
              <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
                <Button onPress={updateUserPasswordHandler} label="Save" type="primary" isLoading={isModifyingUser} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SecurityScreen;
