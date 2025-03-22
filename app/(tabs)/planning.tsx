import React from 'react';
import PlanningScreen from '@/src/feature/planning/presentation/screens/PlanningScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Planning = () => {
 return(
   <GestureHandlerRootView style={{ flex: 1 }}>
     <PlanningScreen/>
   </GestureHandlerRootView>
 )
};
export default Planning;
