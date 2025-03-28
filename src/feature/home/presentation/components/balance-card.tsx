import { Image, Text, View } from 'react-native';
import React from 'react';
import { HandCoins } from 'lucide-react-native';
import images from '@/src/core/constants/images';
import formatNumber from '@/src/core/utils/formatCurrency';
import moment from 'moment';

const BalanceCard = ({balance, currency}:{balance: number, currency?: string}) => {
  return (
    <View
      style={{backgroundImage: `url(${images.balanceBackground})`}}
      className=" gap-y-[8px] bg-[#15B481F2] w-full rounded-2xl relative overflow-hidden">
      <Image source={images.balanceBackground} className="w-full h-full object-cover absolute" />
      <View className="flex flex-row justify-between items-center px-[19px] py-[35px] bg-black/[.21] w-full">
        <View>
          <Text style={{textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 2}}  className="text-white font-urbanist-extrabold text-[32px] ">
            {currency}{formatNumber(balance)}
          </Text>
          <Text style={{textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 2}}   className="text-white text-sm text-[16px]">
            {moment().format("MMMM")} Current Balance
          </Text>
        </View>
        <HandCoins color="white" size={60} strokeWidth={4} absoluteStrokeWidth  />
      </View>
    </View>
  );
};
export default BalanceCard;
