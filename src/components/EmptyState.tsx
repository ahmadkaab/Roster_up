import { LucideIcon } from 'lucide-react-native';
import { MotiView } from 'moti';
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './ui/Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 500 }}
      className="items-center justify-center py-10 px-4"
    >
      <View className="w-20 h-20 bg-gray-900 rounded-full items-center justify-center mb-6 border border-gray-800">
        <Icon size={40} color="#4cc9f0" />
      </View>
      <Text className="text-xl font-bold text-white mb-2 text-center">{title}</Text>
      <Text className="text-gray-400 text-center mb-6 max-w-xs">{description}</Text>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} size="md" />
      )}
    </MotiView>
  );
};
