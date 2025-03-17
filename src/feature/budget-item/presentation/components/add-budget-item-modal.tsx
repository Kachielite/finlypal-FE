import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import EmojiPickerInput from '@/src/shared/presentation/components/form/emoji-picker';
import useBudgetItem from '@/src/feature/budget-item/presentation/state/useBudgetItem';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';


type AddBudgetItemModalProps = {
  modalizeRef: any,
  includeTabPadding?: boolean
}

const AddBudgetItemModal = ({ modalizeRef, includeTabPadding}: AddBudgetItemModalProps) => {
  const { setValue, watch, handleSubmit, errors, resetForm} = useBudgetItem({});
  const modalType = useBudgetItemState((state) => state.modalType);
  const isModifyingBudgetItem = useBudgetItemState((state) => state.isModifyingBudgetItem);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);

  const createBudgetItemHandler = async () => {
    await handleSubmit(async (data) => {
      const payload = {
        budgetItemId: selectedBudgetItem?.id,
        budgetItem: {
          name: data.name,
          icon: data.icon,
          allocated_amount: data.allocatedAmount
        }
      }
      try {
        await budgetItemBloc.handleBudgetItemEvent(
          BUDGET_ITEM_EVENTS.CREATE_BUDGET_ITEM, payload
        );
        modalizeRef.current?.close();
      } catch (e) {
        console.log("Error creating budget item: ", e)
      }
    })()
  }


  const updateBudgetItemHandler = async () => {
    await handleSubmit(async (data) => {
      const payload = {
        budgetItemId: selectedBudgetItem?.id,
        budgetItem: {
          name: data.name,
          icon: data.icon,
          allocated_amount: data.allocatedAmount,
          budget_id: selectedBudgetItem?.budgetId
        }
      }
      
      try {
        await budgetItemBloc.handleBudgetItemEvent(
          BUDGET_ITEM_EVENTS.UPDATE_BUDGET_ITEM, payload
        );
        modalizeRef.current?.close();
      } catch (e) {
        console.log("Error updating budget item: ", e)
      }
    })()
  }


  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="height"
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
        <View className={`flex flex-col justify-between items-center w-full px-[24px] ${includeTabPadding ? 'pt-[24px] pb-[90px]' : 'py-[24px]'} gap-y-[18px]`}>
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
          {modalType === 'edit' ? 'Edit Budget Item' : 'Add Budget Item'}
        </Text>
        <EmojiPickerInput
          onChangeText={(value) => setValue("icon", value, { shouldValidate: true })}
          label="Icon"
          value={watch("icon") || ""}
          error={errors?.icon?.message}
        />
        <FieldInput
          label="Name"
          placeholder="Enter buget item name"
          value={watch("name") || ""}
          onChangeText={(value) => setValue("name", value, { shouldValidate: true })}
          error={errors?.name?.message}
        />
        <FieldInput
          type="numeric"
          label="Allocated Amount"
          placeholder="Enter allocated amount"
          value={watch("allocatedAmount")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            setValue("allocatedAmount", numericValue, { shouldValidate: true });
          }}
          error={errors?.allocatedAmount?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => {
              resetForm()
              modalizeRef?.current?.close();
            }} label="Cancel" />
          </View>
          <View className="w-[55vw]">
            <Button
              onPress={() => modalType === 'edit' ? updateBudgetItemHandler() : createBudgetItemHandler()}
              label={modalType === 'edit' ? 'Update' : 'Add'}
              isLoading={isModifyingBudgetItem}
            />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddBudgetItemModal;
