import { useToastStore } from '@/store/useToastStore';
import { AnimatePresence, MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <View className="absolute top-12 left-4 right-4 z-50 flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <MotiView
            key={toast.id}
            from={{ opacity: 0, translateY: -20, scale: 0.9 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            exit={{ opacity: 0, translateY: -20, scale: 0.9 }}
            transition={{ type: 'timing', duration: 300 }}
            className={`p-4 rounded-xl border shadow-lg ${
              toast.type === 'error'
                ? 'bg-red-500/90 border-red-400'
                : toast.type === 'success'
                ? 'bg-green-500/90 border-green-400'
                : 'bg-gray-800/90 border-gray-700'
            }`}
          >
            <Text className="text-white font-medium">{toast.message}</Text>
          </MotiView>
        ))}
      </AnimatePresence>
    </View>
  );
};
