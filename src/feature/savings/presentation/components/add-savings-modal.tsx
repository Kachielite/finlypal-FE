import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Platform, Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import EmojiPickerInput from '@/src/shared/presentation/components/form/emoji-picker';
import useSavings from '@/src/feature/savings/presentation/state/useSavings';


type AddSavingsModalProps = {
  savingsModal: React.RefObject<Modalize>
  includeTabPadding?: boolean,
  calledInHomeScreen?: boolean
}

const AddSavingsModal = ({includeTabPadding, savingsModal, calledInHomeScreen}: AddSavingsModalProps) => {

  const {
    setValue,
    watch,
    errors,
    modalType,
    isModifyingSaving,
    createSavings,
    updateSavings
  } = useSavings({inChild: true, calledInHomeScreen});


  return (
    <Modalize
      ref={savingsModal}
      adjustToContentHeight
      keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : "height"}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
        <View
          className={`flex flex-col justify-between items-center w-full px-[24px] ${includeTabPadding ? 'pt-[24px] pb-[90px]' : 'py-[24px]'} gap-y-[18px]`}
        >
        <Text
          className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full"
        >
          {modalType === 'edit' ? 'Edit Savings Goal' : 'Add Savings Goal'}
        </Text>
        <EmojiPickerInput
          onChangeText={(value) => setValue("icon", value, { shouldValidate: true })}
          label="Icon"
          value={watch("icon") || ""}
          error={errors?.icon?.message}
        />
        <FieldInput
          label="Goal name"
          placeholder="Enter goal name"
          value={watch("goalName") || ""}
          onChangeText={(value) => setValue("goalName", value, { shouldValidate: true })}
          error={errors?.goalName?.message}
        />
        <FieldInput
          type="numeric"
          label="Target Amount"
          placeholder="Enter target amount"
          value={watch("targetAmount")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            setValue("targetAmount", numericValue, { shouldValidate: true });
          }}
          error={errors?.targetAmount?.message}
        />
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={ watch("startDate") as any}
          onChange={(value) => setValue("startDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.startDate?.message}
        />
        <DatePicker
          label="End Date"
          placeholder="Select start date"
          value={ watch("endDate") as any}
          onChange={(value) => setValue("endDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.endDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button
              type="secondary"
              onPress={() => savingsModal.current?.close()}
              label="Cancel"
            />
          </View>
          <View className="w-[55vw]">
            <Button
              onPress={() => modalType === 'edit' ? updateSavings(savingsModal) : createSavings(savingsModal)}
              label={modalType === 'edit' ? 'Update' : 'Add'}
              isLoading={isModifyingSaving}/>
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddSavingsModal;
