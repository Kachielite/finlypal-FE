import { SplashScreen, Stack } from 'expo-router';
import '@/src/core/theme/global.css';
import { useFonts } from 'expo-font';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "Urbanist-Bold": require("../assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../assets/fonts/Urbanist-ExtraBold.ttf"),
    "Urbanist-Light": require("../assets/fonts/Urbanist-Light.ttf"),
    "Urbanist-Medium": require("../assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Regular": require("../assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-SemiBold": require("../assets/fonts/Urbanist-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  )
}
