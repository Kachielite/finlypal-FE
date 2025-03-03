import React from 'react';
import Toast from 'react-native-toast-message';



const showToast = (
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  message: string
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top', // or 'bottom'
    visibilityTime: 3000,
    autoHide: true,
  });
};

const ToastProvider = () => {
  return <Toast />;
};

export { showToast, ToastProvider };