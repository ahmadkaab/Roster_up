import { clsx } from 'clsx';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input = ({ label, error, className, containerClassName, ...props }: InputProps) => {
  return (
    <View className="w-full gap-2">
      {label && <Text className="text-text-secondary text-sm font-medium ml-1">{label}</Text>}
      <TextInput
        className={clsx(
          'w-full bg-bg-secondary/50 border border-white/10 rounded-xl px-4 py-3.5 text-text-primary placeholder:text-text-muted',
          error && 'border-danger',
          containerClassName,
          className
        )}
        placeholderTextColor="#64748b"
        {...props}
      />
      {error && <Text className="text-danger text-xs ml-1">{error}</Text>}
    </View>
  );
};
