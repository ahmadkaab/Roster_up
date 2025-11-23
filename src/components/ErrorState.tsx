import { Colors } from '@/constants/colors';
import { AlertTriangle } from 'lucide-react-native';
import { MotiView } from 'moti';
import { Text } from 'react-native';
import { Button } from './ui/Button';

interface ErrorStateProps {
  message?: string;
  title?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Something went wrong.', title = 'Oops!', onRetry }: ErrorStateProps) => {
  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="items-center justify-center p-6"
    >
      <AlertTriangle size={48} color={Colors.danger} />
      <Text className="text-white text-lg font-bold mt-4 text-center">{title}</Text>
      <Text className="text-gray-400 text-center mt-2 mb-6">{message}</Text>
      {onRetry && (
        <Button label="Try Again" onPress={onRetry} variant="secondary" />
      )}
    </MotiView>
  );
};
