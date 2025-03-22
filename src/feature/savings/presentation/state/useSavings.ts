import React, { useEffect, useRef } from 'react';
import { savingsBloc } from '@/src/feature/savings/presentation/state/savingsBloc';
import { SAVINGS_EVENTS } from '@/src/feature/savings/presentation/state/savingsEvents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SavingsSchema } from '@/src/core/validation/savings-validation';
import moment from 'moment';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';
import { Modalize } from 'react-native-modalize';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { router } from 'expo-router';

const useSavings = ({savingsId, inChild}: {savingsId?: number, inChild?: boolean}) => {
  // Savings screen modals
  const savingsModal = useRef<Modalize>(null);
  const deleteSavingsModal = useRef<Modalize>(null);
  const expenseModal = useRef<Modalize>(null);
  const deleteExpenseModal = useRef<Modalize>(null);
  const savingsOptionModal = useRef<Modalize>(null);

  // Savings screen state
  const modalType = useSavingState((state) => state.modalType);
  const selectedSaving = useSavingState((state) => state.selectedSaving);
  const savingsList = useSavingState((state) => state.savingList);
  const isModifyingSaving = useSavingState((state) => state.isModifyingSaving);
  const isLoadingSaving = useSavingState((state) => state.isLoadingSaving);

  // Savings screen form
  const {setValue, handleSubmit, watch, formState: { errors, defaultValues }, reset} = useForm({
    resolver: zodResolver(SavingsSchema),
    defaultValues: {
      icon: '🏦',
      goalName: '',
      targetAmount: 0,
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD'),
    }
  })

  const resetSavingsForm = () => {
    reset({
      icon: '🏦',
      goalName: '',
      targetAmount: 0,
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD'),
    })
  }

  // Savings screen functions
  const createSavings =  async (savingsModal: React.RefObject<Modalize>) => {
    await handleSubmit(async (data) => {
      try {
        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.CREATE_SAVINGS, data);
        resetSavingsForm();
        showToast('success', 'Success', 'Your savings goal has been created successfully');
        savingsModal.current?.close();
      } catch (error) {
        console.error('error creating savings, useSavings =>', error);
        showToast('error', 'Error', 'An error occurred while creating your savings goal. Please try again later.');
      }
    })();
  }

  const updateSavings = async (savingsModal: React.RefObject<Modalize>) => {
    await handleSubmit(async (data) => {
      try {
        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.UPDATE_SAVINGS, {data, savingsId: selectedSaving?.id});
        resetSavingsForm();
        showToast('success', 'Success', 'Your savings goal has been updated successfully');
        savingsModal.current?.close();
      } catch (error) {
        console.error("error updating savings, useSavings =>", error);
        showToast('error', 'Error', 'An error occurred while updating your savings goal. Please try again later.');
      }
    })();
  }

  const deleteSavings = async () => {
    try {
      await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.DELETE_SAVINGS, {savingsId: selectedSaving?.id});
      await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {});
      showToast('success', 'Success', 'Your savings goal has been deleted successfully');
      deleteSavingsModal.current?.close();
      router.back();
    } catch (error) {
      console.error("error deleting savings, useSavings =>", error);
      showToast('error', 'Error', 'An error occurred while deleting your savings goal. Please try again later.');
    }
  }

  // Screen modal functions
  const openSavingsModal = (modalType: 'add' | 'edit') => {
    useSavingState.getState().setModalType(modalType);
    savingsModal.current?.open();
  }

  const openDeleteSavingsModal = () => {
    deleteSavingsModal.current?.open();
  }

  const openExpenseModal = (modalType: 'add' | 'edit') => {
    useExpenseState.getState().setModalType(modalType);
    expenseModal.current?.open();
  }

  const openDeleteExpenseModal = () => {
    deleteExpenseModal.current?.open();
  }

  const closeSavingsModal = () => {
    resetSavingsForm();
    savingsModal.current?.close();
  }


  // Effects
  // Fetch all savings
  useEffect(() => {
    (
      async () => {
        if(!inChild){
          try {
            await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {});
          } catch (error) {
            console.error("useSavings error in savings bloc =>", error)
          }
        }
      }
    )()
  }, []);

  // Fetch savings by id
  useEffect(() => {
    (
      async () => {
        if(savingsId){
          console.log("I got called")
          try {
            await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_SAVINGS_BY_ID, {savingsId});
            if(modalType === 'edit'){
              reset({
                icon: selectedSaving?.icon,
                goalName: selectedSaving?.goalName,
                targetAmount: selectedSaving?.targetAmount,
                startDate: moment(selectedSaving?.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectedSaving?.endDate).format('YYYY-MM-DD'),
              });
            }
          } catch (error) {
            console.error("useSavings error in savings bloc =>", error)
          }
        }
      }
    )()
  }, [savingsId, modalType])


  console.log("selectedSaving", selectedSaving)
  console.log("modalType", modalType)



  return {
    setValue,
    handleSubmit,
    watch,
    errors,
    defaultValues,
    savingsList,
    modalType,
    isModifyingSaving,
    savingsModal,
    isLoadingSaving,
    selectedSaving,
    expenseModal,
    deleteExpenseModal,
    deleteSavingsModal,
    savingsOptionModal,
    resetSavingsForm,
    createSavings,
    updateSavings,
    deleteSavings,
    openSavingsModal,
    openDeleteSavingsModal,
    openExpenseModal,
    openDeleteExpenseModal,
    closeSavingsModal
  }

}

export default useSavings;