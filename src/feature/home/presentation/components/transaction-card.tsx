import { Text, View } from 'react-native';
import React from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import moment from 'moment';
import formatNumber from '@/src/core/utils/formatCurrency';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

type TransactionCardProps = {
  id: number;
  amount: number;
  type: string
  date: string;
  description: string;
};

const TransactionCard = ({amount, date, description, type} : TransactionCardProps) => {
  const currency = useAuthState((state) => state.user?.currency.symbol);
  return (
    <View className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] pb-4">
      <View className="flex flex-row justify-start items-center gap-x-[12px]">
        {type === 'EXPENSE' && <ArrowBigDown color="#CE174B" size={22}/>}
        {type === 'INCOME' && <ArrowBigUp color="#17CE92" size={22}/>}
        <View className="flex flex-col justify-start items-start gap-y-[4px]">
          <Text className="text-white font-urbanist-bold text-[18px]">{description.split(" ").slice(0, 2).join(' ')}</Text>
          <Text className="text-white text-[12px]">{moment(date).format('DD MMM, YYYY')}</Text>
        </View>
      </View>
      <Text className={`font-urbanist-semibold text-[16px] ${type === 'EXPENSE' ? 'text-[#CE174B]' : 'text-[#17CE92]'}`}>
        {type === 'EXPENSE' ? '-' : '+'}
        {currency}{formatNumber(amount)}
      </Text>
    </View>
  );
};
export default TransactionCard;
