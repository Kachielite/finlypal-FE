import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/form/field-input';
import Button from '@/src/shared/presentation/form/button';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { useForm } from 'react-hook-form';
import { requestResetPasswordSchema } from '@/src/core/validation/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_EVENTS } from '@/src/feature/authentication/presentation/state/authEvent';
import { authBloc } from '@/src/feature/authentication/presentation/state/authBloc';

const RequestResetPasswordScreen = () => {
  const {isLoading} = useAuthState.getState();

  const {setValue, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange"
  })

  const onSubmit = async (data: any) => {
    await authBloc.handleAuthEvent(AUTH_EVENTS.REQUEST_RESET_PASSWORD, { email: data.email });
  }

  return (
    <SafeAreaView className="bg-primary h-screen w-screen">
      <View className="flex flex-col justify-between items-center h-full w-full">
        <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28}/>
          </TouchableOpacity>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[32px]">
            <View className="gap-y-[16px] flex flex-col justify-start items-start w-full">
              <Text className="font-urbanist-bold text-[32px] text-white">Reset your password 🔑</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">
                Please enter your email and we will send an OTP code in the next step to reset your password.
              </Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <FieldInput type="email" label="Email" placeholder="Enter your email" value={watch("email")} onChangeText={(text) => setValue("email", text, { shouldValidate: true })} error={errors.email?.message} />
          </View>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button onPress={handleSubmit(onSubmit)} label="Continue" type="primary" isLoading={isLoading} />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default RequestResetPasswordScreen;
