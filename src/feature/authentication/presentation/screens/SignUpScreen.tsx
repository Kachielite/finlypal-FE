import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, Animated, Keyboard, Platform
} from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/form/field-input';
import PasswordFieldInput from '@/src/shared/presentation/form/password-input';
import Button from '@/src/shared/presentation/form/button';
import CheckBox from '@/src/shared/presentation/form/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '@/src/core/validation/auth-validation';
import { useForm } from 'react-hook-form';
import { AUTH_EVENTS } from '@/src/feature/authentication/presentation/state/authEvent';
import { authBloc } from '@/src/feature/authentication/presentation/state/authBloc';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import ScrollView = Animated.ScrollView;

const SignUpScreen = () => {
  const {isLoading} = useAuthState.getState()
  const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      acceptTerms: true
    },
    mode: "onChange"
  });

  const onSubmit = async (data: any) => await authBloc.handleAuthEvent(AUTH_EVENTS.SIGN_UP, { name: data.name, email: data.email, password: data.password });


  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
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
              <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
                <TouchableOpacity onPress={() => router.back()}>
                  <ArrowLeft color="white" size={28} />
                </TouchableOpacity>

                <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
                  <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
                    <Text className="font-urbanist-bold text-[32px] text-white">Hello there 👋</Text>
                    <Text className="font-urbanist-regular text-[18px] text-white">
                      Please enter your email & password to create an account.
                    </Text>
                  </View>
                </View>

                <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
                  <FieldInput
                    type="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={watch("name")}  // Ensure controlled behavior
                    onChangeText={(text) => setValue("name", text, { shouldValidate: true })} // Update value + trigger validation
                    error={errors.name?.message}
                  />

                  <FieldInput
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={watch("email")}
                    onChangeText={(text) => setValue("email", text, { shouldValidate: true })}
                    error={errors.email?.message}
                  />
                  <PasswordFieldInput
                    label="Password"
                    placeholder="Enter your password"
                    value={watch("password")}
                    onChangeText={(text) => setValue("password", text, { shouldValidate: true })}
                    error={errors.password?.message}
                  />

                  <View className="w-full flex flex-col justify-start items-start gap-y-[16px]">
                    <View className="flex flex-row justify-start items-center w-full gap-x-[8px] mt-7">
                      <CheckBox
                        onChange={() => setValue("acceptTerms", !watch("acceptTerms"))}
                        isChecked={watch("acceptTerms")}
                      />
                      <View className="flex flex-row justify-start items-center gap-x-1">
                        <Text className="text-white font-urbanist-regular text-[16px]">I agree to FinlyPal's</Text>
                        <TouchableOpacity onPress={() => console.log("Terms and conditions")}>
                          <Text className="text-secondary font-urbanist-bold text-[16px]">Terms and conditions</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text className="font-urbanist-regular text-[12px] text-red-500">{errors.acceptTerms?.message}</Text>
                  </View>
                </View>
              </View>

              <View className="w-full py-[20px] flex flex-row justify-center items-center">
                <Text className="text-white font-urbanist-medium text-[16px]">Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/sign-in")}>
                  <Text className="text-secondary font-urbanist-bold text-[16px] ml-[8px]">Log in</Text>
                </TouchableOpacity>
              </View>

              <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
                <Button onPress={handleSubmit(onSubmit)} label="Continue" type="primary" isLoading={isLoading} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUpScreen;
