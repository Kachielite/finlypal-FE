import React from 'react';
import InsightsScreen from '@/src/feature/insights/presentation/screens/InsightsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Insights = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InsightsScreen/>
    </GestureHandlerRootView>
  );

};
export default Insights;
