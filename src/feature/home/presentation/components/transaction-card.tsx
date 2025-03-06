import { Text, View } from 'react-native';
import React from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import moment from 'moment';

type TransactionCardProps = {
  id: number;
  amount: number;
  type: string
  date: string;
  description: string;
};

const TransactionCard = ({amount, date, description, type} : TransactionCardProps) => {
  return (
    <View className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] pb-4">
      <View className="flex flex-row justify-start items-center gap-x-[16px]">
        {type === 'EXPENSE' && <ArrowBigDown color="#CE174B" size={24}/>}
        {type === 'INCOME' && <ArrowBigUp color="#17CE92" size={24}/>}
        <View className="flex flex-col justify-start items-start gap-y-[4px]">
          <Text className="text-white font-urbanist-bold text-[20px]">{description}</Text>
          <Text className="text-white text-[12px]">{moment(date).format('DD MMM, YYYY')}</Text>
        </View>
      </View>
      <Text className={`font-urbanist-semibold text-[18px] ${type === 'EXPENSE' ? 'text-[#CE174B]' : 'text-[#17CE92]'}`}>
        {type === 'EXPENSE' ? '-' : '+'}
        ${amount}
      </Text>
    </View>
  );
};
export default TransactionCard;
