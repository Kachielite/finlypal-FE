import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';

type AppModalProps = {
  modalizeRef: any,
  title: string,
  description: string,
  proceedAction: () => void,
  proceedButtonLabel?: string,
  isLoading?: boolean,
  includeTabPadding?: boolean
}

const AddExpenseModal = (
  { modalizeRef, title, proceedButtonLabel, proceedAction, description, isLoading, includeTabPadding}: AppModalProps
) => {

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className={`flex flex-col justify-between items-center w-full px-[24px] ${includeTabPadding ? 'pt-[24px] pb-[90px]' : 'py-[24px]'} gap-y-[28px]`}>
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
          {title}
        </Text>
        <Text className="font-urbanist-normal text-white text-[18px] text-center leading-[2rem]">{description}</Text>
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px]">
          <View className="w-[30vw]">
            <Button
              type="secondary"
              onPress={() => modalizeRef.current?.close()}
              label="Cancel"
            />
          </View>
          <View className="w-[55vw]">
            <Button
              onPress={proceedAction}
              label={proceedButtonLabel || "Proceed"}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddExpenseModal;
