import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Platform, Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import useBudget from '@/src/feature/budget/presentation/state/useBudget';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import EmojiPickerInput from '@/src/shared/presentation/components/form/emoji-picker';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';


type AddBudgetModalProps = {
  modalizeRef: any,
  includeTabPadding?: boolean
}

const AddBudgetModal = ({ modalizeRef, includeTabPadding}: AddBudgetModalProps) => {
  const { setValue, watch, handleSubmit, errors, resetAddBudgetForm} = useBudget({});
  const modalType = useBudgetState((state) => state.modalType);
  const isModifyingBudget = useBudgetState((state) => state.isModifyingBudget);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);

  const createBudgetHandler = async () => {
    await handleSubmit(async (data) => {
      try {
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.CREATE_BUDGET, data);
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
        resetAddBudgetForm()
        modalizeRef.current?.close();
      } catch (e) {
        console.log("Error creating budget: ", e)
      }

    })()
  }

  const updateBudgetHandler = async () => {
    await handleSubmit(async (data) => {
      try{
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.UPDATE_BUDGET, { budgetId: selectedBudget?.id, ...data });
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, { budgetId: selectedBudget?.id });
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
        modalizeRef.current?.close();
      } catch (e) {
        console.log("Error updating budget: ", e)
      }
    })()
  }


  return (
    <Modalize
      onClosed={() => resetAddBudgetForm()}
      onClose={() => resetAddBudgetForm()}
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : "height"}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
        <View className={`flex flex-col justify-between items-center w-full px-[24px] ${includeTabPadding ? 'pt-[24px] pb-[90px]' : 'py-[24px]'} gap-y-[18px]`}>
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
          {modalType === 'edit' ? 'Edit Budget' : 'Add Budget'}
        </Text>
        <EmojiPickerInput
          onChangeText={(value) => setValue("icon", value, { shouldValidate: true })}
          label="Icon"
          value={watch("icon") || ""}
          error={errors?.icon?.message}
        />
        <FieldInput
          label="Budget name"
          placeholder="Enter buget name"
          value={watch("budgetName") || ""}
          onChangeText={(value) => setValue("budgetName", value, { shouldValidate: true })}
          error={errors?.budgetName?.message}
        />
        <FieldInput
          type="numeric"
          label="Total Budget Amount"
          placeholder="Enter expense amount"
          value={watch("totalBudget")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            setValue("totalBudget", numericValue, { shouldValidate: true });
          }}
          error={errors?.totalBudget?.message}
        />
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={ watch("startDate")}
          onChange={(value) => setValue("startDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.startDate?.message}
        />
        <DatePicker
          label="End Date"
          placeholder="Select start date"
          value={ watch("endDate")}
          onChange={(value) => setValue("endDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.endDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => {
              resetAddBudgetForm()
              modalizeRef?.current?.close();
            }} label="Cancel" />
          </View>
          <View className="w-[55vw]">
            <Button onPress={() => modalType === 'edit' ? updateBudgetHandler() : createBudgetHandler()} label="Add" isLoading={isModifyingBudget}/>
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddBudgetModal;
