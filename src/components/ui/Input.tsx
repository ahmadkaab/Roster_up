import { clsx } from 'clsx';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className, ...props }: InputProps) => {
  return (
    <View className="w-full gap-2">
      {label && <Text className="text-gray-400 text-sm font-medium ml-1">{label}</Text>}
      <TextInput
        className={clsx(
          'w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder:text-gray-600',
          error && 'border-danger',
          className
        )}
        placeholderTextColor="#4b5563"
        {...props}
      />
      {error && <Text className="text-danger text-xs ml-1">{error}</Text>}
    </View>
  );
};
