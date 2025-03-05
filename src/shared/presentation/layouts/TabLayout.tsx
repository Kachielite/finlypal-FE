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
          borderWidth: 1,
          minHeight: 80,
          paddingTop: 20
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House} title="Overview"/>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ReceiptText} title="Expenses"/>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ChartNoAxesCombined} title="Insights"/>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
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
