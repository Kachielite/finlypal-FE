import React from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { router, useLocalSearchParams } from 'expo-router';

const WebViewScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <WebView
        goBack={() => router.back()}
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="blue" />}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;