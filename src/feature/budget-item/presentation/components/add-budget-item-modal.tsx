import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Platform, Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import EmojiPickerInput from '@/src/shared/presentation/components/form/emoji-picker';
import useBudgetItem from '@/src/feature/budget-item/presentation/state/useBudgetItem';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';


type AddBudgetItemModalProps = {
  modalizeRef: any,
  includeTabPadding?: boolean
}

const AddBudgetItemModal = ({ modalizeRef, includeTabPadding}: AddBudgetItemModalProps) => {
  const { setValue, watch, handleSubmit, errors, resetForm} = useBudgetItem({});
  const modalType = useBudgetItemState((state) => state.modalType);
  const isModifyingBudgetItem = useBudgetItemState((state) => state.isModifyingBudgetItem);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);

  const createBudgetItemHandler = async () => {
    await handleSubmit(async (data) => {
      const payload = {
        budgetId: selectedBudget?.id,
        budgetItems: [{
          name: data.name,
          icon: data.icon,
          allocated_amount: data.allocatedAmount
        }]
      }
      try {
        await budgetItemBloc.handleBudgetItemEvent(
          BUDGET_ITEM_EVENTS.CREATE_BUDGET_ITEM, payload
        );
        // update selected budget
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: selectedBudget?.id as number});
        resetForm();
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

      // update budget item
      const updatedBudgetItem = {
        id: selectedBudgetItem?.id as number,
        name: data.name as string,
        icon: data.icon as string,
        status: selectedBudgetItem?.status,
        statusTooltip: selectedBudgetItem?.statusTooltip,
        expenses: selectedBudgetItem?.expenses,
        actualSpend: selectedBudgetItem?.actualSpend,
        allocatedAmount: data.allocatedAmount as number,
        budgetId: selectedBudgetItem?.budgetId,
        createdAt: selectedBudgetItem?.createdAt
      }

      try {
        await budgetItemBloc.handleBudgetItemEvent(
          BUDGET_ITEM_EVENTS.UPDATE_BUDGET_ITEM, payload
        );
        // update selected budget
        const selectedBugetBugdetItems = selectedBudget?.budgetItems as BudgetItem[]
        const updatedBudgetItems = selectedBugetBugdetItems.map((budgetItem) => budgetItem.id === selectedBudgetItem?.id ? updatedBudgetItem : budgetItem);
        const updatedSelectedBudget = {...selectedBudget, budgetItems: updatedBudgetItems} as Budget;
        useBudgetState.getState().setSelectedBudget(updatedSelectedBudget);
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
      keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : "height"}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
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
          value={watch("allocatedAmount")?.toString() || ""}
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0;
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
