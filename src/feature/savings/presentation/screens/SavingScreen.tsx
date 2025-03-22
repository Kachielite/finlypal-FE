import { FlatList, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import images from '@/src/core/constants/images';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, EllipsisVertical, Info } from 'lucide-react-native';
import Loader from '@/src/shared/presentation/components/loader';
import useSavings from '@/src/feature/savings/presentation/state/useSavings';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import BalanceCard from '@/src/feature/savings/presentation/components/balance-card';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import SavingsOptionModal from '@/src/feature/savings/presentation/components/savings-option';
import AddSavingsModal from '@/src/feature/savings/presentation/components/add-savings-modal';
import AppModal from '@/src/shared/presentation/components/app-modal';
import { Modalize } from 'react-native-modalize';
import AddExpenseToSavingsModal from '@/src/feature/savings/presentation/components/add-expense-to-savings-modal';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpenseOptionModal from '@/src/feature/expenses/presentation/components/expense-option-modal';

const SavingScreen = () => {
  // Savings screen modals
  const savingsModal = useRef<Modalize>(null);
  const deleteSavingsModal = useRef<Modalize>(null);
  const expenseModal = useRef<Modalize>(null);
  const deleteExpenseModal = useRef<Modalize>(null);
  const savingsOptionModal = useRef<Modalize>(null);
  const expenseOptionModal = useRef<Modalize>(null);

  const { savings_id } = useLocalSearchParams<{ savings_id: string }>();
  const {
    isLoadingSaving,
    selectedSaving,
    isModifyingSaving,
    expenseForm,
    isModifyingExpense,
    deleteSavings,
    createExpenseHandler,
    editExpenseHandler,
    deleteExpenseHandler
  } = useSavings({savingsId: Number(savings_id), deleteSavingsModal, deleteExpenseModal});
  const groupedExpenses = useMemo(() => groupExpenseByDate(selectedSaving?.expenses || []), [selectedSaving?.expenses]);

  return (
   <>
     <View className="relative flex-1 bg-[#102632] ">
       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
       <ImageBackground
         source={images.savingsBackground}
         className="relative w-full h-[30vh] rounded-b-[40px] overflow-hidden"
         resizeMode="cover"
       >
         <View className="flex-1 w-full flex-col justify-start items-start px-6 pt-4 pb-10 gap-y-10 mt-[60px] z-50 ">
           <View className="flex-row justify-between items-center w-full">
             <TouchableOpacity onPress={() => router.back()}>
               <ArrowLeft  color="white" size={28} />
             </TouchableOpacity>
             <Text style={{textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 2}} className="text-white font-urbanist-bold text-2xl">
               Savings Goal Details
             </Text>
             <TouchableOpacity onPress={() => savingsOptionModal?.current?.open()}>
               <EllipsisVertical color="white" size={28} />
             </TouchableOpacity>
           </View>
         </View>
       </ImageBackground>
       {isLoadingSaving ? (
         <View className="flex-1 flex-col justify-center items-center w-full">
           <Loader />
         </View>
       ) : (
         <>
           <BalanceCard selectedSaving={selectedSaving as Savings}/>
           <View
             className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[25px] absolute top-[27rem]">
             <View className="flex flex-row justify-start items-center gap-x-[5px] w-[88w]">
               <Info color="white" size={18} strokeWidth={3}/>
               <Text className="text-white font-urbanist-normal text-[14px]">{selectedSaving?.statusTooltip}</Text>
             </View>
               {/* Expenses List with FlatList */}
               <FlatList
                 data={groupedExpenses}
                 keyExtractor={(item) => item.date} // Ensure unique keys
                 renderItem={({ item }) =>
                   <ExpensesList
                     data={item}
                     createModalRef={expenseModal}
                     deleteModalRef={deleteExpenseModal}
                     optionModalRef={expenseOptionModal}
                   />
                 }
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{ paddingBottom: 40 }} // Preserve bottom spacing
                 onEndReachedThreshold={0.5}
                 maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
                 ListEmptyComponent={
                   <View className="flex flex-col justify-center items-center w-[88vw] h-[30vh] bg-alternative rounded-[12px]">
                     <EmptyTransactionList title="No Expenses Found" message="Add one to get started" />
                   </View>
                 }
               />
           </View>
         </>
       )}
     </View>
     <SavingsOptionModal
        savingsOptionModal={savingsOptionModal}
        savingsModal={savingsModal}
        deleteSavingsModal={deleteSavingsModal}
        expenseModal={expenseModal}
     />
     <AddSavingsModal
       savingsModal={savingsModal}
     />
     <AddExpenseToSavingsModal
       expenseModal={expenseModal}
       createExpenseHandler={createExpenseHandler}
       editExpenseHandler={editExpenseHandler}
       isModifyingExpense={isModifyingSaving}
       expenseForm={expenseForm}
     />
     <AppModal
       modalizeRef={deleteSavingsModal}
       title="Delete Savings Goal"
       description="Are you certain you want to delete this savings goal? This action will permanently remove all associated expenses."
       proceedAction={deleteSavings}
       proceedButtonLabel="Delete"
       isLoading={isModifyingSaving}
     />
     <AppModal
       modalizeRef={deleteExpenseModal}
       title="Delete Expense"
       description="Are you sure you want to delete this expense?"
       proceedAction={deleteExpenseHandler}
       proceedButtonLabel="Delete"
       isLoading={isModifyingExpense}
     />
     <ExpenseOptionModal
       modalizeRef={expenseOptionModal}
       createModalRef={expenseModal}
       deleteModalRef={deleteExpenseModal}
     />
   </>
  );
};
export default SavingScreen;
