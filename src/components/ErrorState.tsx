import { AlertTriangle } from 'lucide-react-native';
import { MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './ui/Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Something went wrong.', onRetry }: ErrorStateProps) => {
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 items-center justify-center p-6 bg-bg-main"
    >
      <View className="w-16 h-16 bg-red-500/10 rounded-full items-center justify-center mb-4 border border-red-500/20">
        <AlertTriangle size={32} color="#ef4444" />
      </View>
      <Text className="text-xl font-bold text-white mb-2 text-center">Oops!</Text>
      <Text className="text-gray-400 text-center mb-6">{message}</Text>
      {onRetry && (
        <Button label="Try Again" onPress={onRetry} variant="secondary" />
      )}
    </MotiView>
  );
};
