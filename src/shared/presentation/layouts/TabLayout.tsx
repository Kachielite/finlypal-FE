import React from 'react';
import { Tabs } from 'expo-router';
import TabIcon from '@/src/shared/presentation/components/tab-icon';
import { ChartNoAxesCombined, House, ReceiptText, UserRound } from 'lucide-react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#102632',
          position: 'absolute',
          borderTopColor: '#35383F',
          borderTopWidth: 1,
          minHeight: 80,
          paddingTop: 20,
          paddingBottom: 20,
          boxShadow: '0px -1px 0px #35383F',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Overview',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House} title="Overview"/>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          headerShown: false,
          title: 'Expenses',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ReceiptText} title="Expenses"/>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          headerShown: false,
          title: 'Insights',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ChartNoAxesCombined} title="Insights"/>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={UserRound} title="Account"/>
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
