import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Button from '@/src/shared/presentation/form/button';
import PasswordFieldInput from '@/src/shared/presentation/form/password-input';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '@/src/core/validation/auth-validation';
import { authBloc } from '@/src/feature/authentication/presentation/state/authBloc';
import { AUTH_EVENTS } from '@/src/feature/authentication/presentation/state/authEvent';

const ResetPasswordScreen = () => {
  const {isLoading} = useAuthState.getState();
  const {setValue, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange"
  })

  const onSubmit = async (data: any) => {
    await authBloc.handleAuthEvent(AUTH_EVENTS.RESET_PASSWORD, { password: data.password, confirmPassword: data.confirmPassword });
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
              <Text className="font-urbanist-bold text-[30px] text-white">Create New Password 🔒</Text>
              <Text className="font-urbanist-regular text-[18px] text-white">
                Create your new password. If you forget it, then you have to do forgot password.
              </Text>
            </View>
          </View>
          <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
            <PasswordFieldInput
              label="New Password"
              placeholder="Enter new password"
              value={watch("password")}
              onChangeText={(text) => setValue("password", text)}
              error={errors.password?.message}
            />
            <PasswordFieldInput
              label="Confirm New Password"
              placeholder="Renter new password"
              value={watch("confirmPassword")}
              onChangeText={(text) => setValue("confirmPassword", text)}
              error={errors.confirmPassword?.message}
            />
          </View>
        </View>
        <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
          <Button
            onPress={handleSubmit(onSubmit)}
            label="Continue"
            type="primary"
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ResetPasswordScreen;
