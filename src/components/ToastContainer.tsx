import { useToastStore } from '@/store/useToastStore';
import React from 'react';
import { Text, View } from 'react-native';

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <View className="absolute top-12 left-4 right-4 z-50 flex-col gap-2">
      {toasts.map((toast) => (
        <View
          key={toast.id}
          className={`p-4 rounded-xl border ${
            toast.type === 'error'
              ? 'bg-red-500/90 border-red-400'
              : toast.type === 'success'
              ? 'bg-green-500/90 border-green-400'
              : 'bg-gray-800/90 border-gray-700'
          }`}
        >
          <Text className="text-white font-medium">{toast.message}</Text>
        </View>
      ))}
    </View>
  );
};
