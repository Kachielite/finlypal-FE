import React from 'react';
import Toast from 'react-native-toast-message';

let suppressToasts = false; // Global flag

export const suppressAllToasts = (value: boolean) => {
  suppressToasts = value;
};

const showToast = (
  type: 'success' | 'error' | 'info' | 'warning',
  title: string,
  message: string
) => {
  if (suppressToasts) return; // Prevent toast from showing if suppressed

  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 60
  });
};

const ToastProvider = () => {
  return <Toast />;
};

export { showToast, ToastProvider };