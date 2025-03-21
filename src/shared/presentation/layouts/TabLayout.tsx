import React from 'react';
import { Tabs } from 'expo-router';
import TabIcon from '@/src/shared/presentation/components/tab-icon';
import { ChartNoAxesCombined, House, Notebook, ReceiptText, UserRound } from 'lucide-react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#102632',
          position: 'absolute',
          borderTopWidth: 1,
          borderTopColor: "#35383F",
          minHeight: 60,
          paddingTop: 10,
          paddingBottom: 10,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Overview',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={House}/>
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          headerShown: false,
          title: 'Expenses',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ReceiptText}/>
          ),
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          headerShown: false,
          title: 'Planning',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={Notebook}/>
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          headerShown: false,
          title: 'Insights',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={ChartNoAxesCombined}/>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          headerShown: false,
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={UserRound}/>
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
