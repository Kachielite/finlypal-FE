import React, { useEffect } from 'react';
import { savingsBloc } from '@/src/feature/savings/presentation/state/savingsBloc';
import { SAVINGS_EVENTS } from '@/src/feature/savings/presentation/state/savingsEvents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SavingsExpenseSchema, SavingsSchema } from '@/src/core/validation/savings-validation';
import moment from 'moment';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';
import { Modalize } from 'react-native-modalize';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { router } from 'expo-router';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';


const useSavings = (
  {savingsId, inChild, deleteSavingsModal, deleteExpenseModal}:
    {savingsId?: number, inChild?: boolean, deleteSavingsModal?: React.RefObject<Modalize>, deleteExpenseModal?: React.RefObject<Modalize>}
) => {

  // Savings screen state
  const modalType = useSavingState((state) => state.modalType);
  const selectedSaving = useSavingState((state) => state.selectedSaving);
  const savingsList = useSavingState((state) => state.savingList);
  const isModifyingSaving = useSavingState((state) => state.isModifyingSaving);
  const isLoadingSaving = useSavingState((state) => state.isLoadingSaving);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const expenseList = useExpenseState((state) => state.expenseList);
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const expenseModalType = useExpenseState((state) => state.modalType);

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

  // Expense modal form
  const expenseForm = useForm({
    resolver: zodResolver(SavingsExpenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: {id: 0, label: "", value: ""},
      date: moment().format('YYYY-MM-DD'),
    }
  })

  // reset expense form
  const resetExpenseForm = () => {
    expenseForm.reset({
      description: "",
      amount: 0,
      category: {id: 0, label: "", value: ""},
      date: moment().format('YYYY-MM-DD'),
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
      deleteSavingsModal && deleteSavingsModal.current?.close();
      router.back();
    } catch (error) {
      console.error("error deleting savings, useSavings =>", error);
      showToast('error', 'Error', 'An error occurred while deleting your savings goal. Please try again later.');
    }
  }

  // Expense form functions
  const createExpenseHandler = async (expenseModal: React.RefObject<Modalize>) => {
    await expenseForm.handleSubmit(async (data) => {
      try {
        await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.CREATE_EXPENSE, {
          description: data.description,
          amount: data.amount,
          date: data.date,
          categoryId: data.category.id,
          type: 'INCOME',
          savingsID: selectedSaving?.id
        });

        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_SAVINGS_BY_ID, {savingsId: selectedSaving?.id});
        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {});

        resetExpenseForm();
        expenseModal?.current?.close();

      } catch (error) {
        console.log("Error creating expense: ", error);
      }
    })()
  }

  const editExpenseHandler = async (expenseModal: React.RefObject<Modalize>) => {
    await expenseForm.handleSubmit(async (data) => {

      try {
        await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.UPDATE_EXPENSE, {
          id: selectedExpense?.id,
          description: data.description,
          amount: data.amount,
          date: data.date,
          categoryId: data.category.id,
          type: 'INCOME',
          savingsID: selectedSaving?.id
        });

        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_SAVINGS_BY_ID, {savingsId: selectedSaving?.id});
        await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {});

        resetExpenseForm();
        expenseModal?.current?.close();
      } catch (error) {
        console.log("Error updating expense: ", error);
      }
    })()
  }

  const deleteExpenseHandler = async () => {

    await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.DELETE_EXPENSE, {id: selectedExpense?.id});
    useExpenseState.getState().setExpenseList([...expenseList.filter((item) => item.id !== selectedExpense?.id)])

    await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_SAVINGS_BY_ID, {savingsId: selectedSaving?.id});
    await savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {});

    deleteExpenseModal && deleteExpenseModal.current?.close();
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

  useEffect(() => {
    if (expenseModalType === "edit" && selectedExpense) {
      expenseForm.reset({
        description: selectedExpense.description,
        amount: selectedExpense.amount,
        category: {id: selectedExpense.categoryId, label: selectedExpense.categoryName, value: selectedExpense.categoryName},
        date: selectedExpense.date,
      })
    } else {
      expenseForm.reset({
        description: "",
        amount: 0,
        category: {id: 0, label: "", value: ""},
        date: moment().format('YYYY-MM-DD'),
      })
    }
  }, [selectedExpense, expenseModalType]);


  // console.log("selectedSaving", selectedSaving)
  // console.log("modalType", modalType)



  return {
    setValue,
    handleSubmit,
    watch,
    errors,
    defaultValues,
    savingsList,
    modalType,
    isModifyingSaving,
    isLoadingSaving,
    selectedSaving,
    expenseForm,
    isModifyingExpense,
    resetSavingsForm,
    createSavings,
    updateSavings,
    deleteSavings,
    resetExpenseForm,
    createExpenseHandler,
    editExpenseHandler,
    deleteExpenseHandler,
  }

}

export default useSavings;