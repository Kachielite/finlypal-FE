import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ArrowBigDown, ArrowBigUp, EditIcon, TrashIcon } from 'lucide-react-native';
import formatNumber from '@/src/core/utils/formatCurrency';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { Swipeable } from 'react-native-gesture-handler';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';


const DeleteExpenseButton = ({handleSwipe}:{handleSwipe: (direction: 'left' | 'right') => void}) => {
  return (
    <TouchableOpacity onPress={() => handleSwipe('left')} className="flex justify-center items-center w-[80px] bg-red-500 rounded-l-lg" >
      <TrashIcon size={24} color="white" />
    </TouchableOpacity>
  );
};

const EditExpenseButton = ({handleSwipe}:{handleSwipe: (direction: 'left' | 'right') => void}) => {
  return (
    <TouchableOpacity onPress={() => handleSwipe('right')} className="flex justify-center items-center w-[80px] bg-secondary rounded-r-lg">
      <EditIcon size={24} color="white" />
    </TouchableOpacity>
  );
};




const ExpenseCard = (
  {expense, createModalRef, deleteModalRef, optionModalRef} : {expense: Expense, createModalRef: any, deleteModalRef: any, optionModalRef: any}
) => {
  const setModalType = useExpenseState((state) => state.setModalType);
  const setSelectedExpense = useExpenseState((state) => state.setSelectedExpense);

  const handleSwipe = (direction: 'left' | 'right') => {
    setSelectedExpense(expense);
    if (direction === 'right') {
      setModalType('edit');
      createModalRef.current?.open();
    } else if (direction === 'left') {
      deleteModalRef.current?.open();
    }
  };

  const longPressHandler = () => {
    setSelectedExpense(expense);
    optionModalRef.current?.open()
  };

  return (
    <Swipeable
      overshootRight={false}
      overshootLeft={false}
      friction={2}
      containerStyle={{ width: '100%' }}
      renderLeftActions={() => <DeleteExpenseButton handleSwipe={handleSwipe} />}
      renderRightActions={() => <EditExpenseButton handleSwipe={handleSwipe} />}
    >
      <TouchableOpacity activeOpacity={0.85} onLongPress={longPressHandler} className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4 rounded-lg bg-[#1E2A32] px-[12px]">
        <View className="flex flex-row justify-start items-center gap-x-[12px]">
          {expense.type === 'EXPENSE' && <ArrowBigDown color="#CE174B" size={24}/>}
          {expense.type === 'INCOME' && <ArrowBigUp color="#17CE92" size={24}/>}
          <View className="flex flex-col justify-start items-start gap-y-[8px]">
            <Text className="text-white font-urbanist-bold text-[20px]">{expense?.description?.split(" ").slice(0, 2).join(' ')}</Text>
            <Text className="text-white font-urbanist-normal text-[14px]">{expense?.categoryName}</Text>
          </View>
        </View>
        <Text className={`font-urbanist-semibold text-[18px] ${expense.type === 'EXPENSE' ? 'text-[#CE174B]' : 'text-[#17CE92]'}`}>
          {expense.type === 'EXPENSE' ? '-' : '+'}
          ${formatNumber(expense.amount)}
        </Text>
      </TouchableOpacity>
    </Swipeable>
  );
};
export default ExpenseCard;
