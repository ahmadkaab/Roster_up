import { Colors } from '@/constants/colors';
import { LucideIcon } from 'lucide-react-native';
import { MotiView } from 'moti';
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
      className="items-center justify-center p-6"
    >
      <View className="w-16 h-16 rounded-full bg-gray-800 items-center justify-center mb-4">
        <Icon size={32} color={Colors.gray[400]} />
      </View>
      <Text className="text-white text-lg font-bold text-center">{title}</Text>
      <Text className="text-gray-400 text-center mt-2 mb-6">{description}</Text>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} size="md" />
      )}
    </MotiView>
  );
};
