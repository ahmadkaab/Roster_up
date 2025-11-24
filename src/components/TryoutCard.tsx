import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
import { Calendar, Users } from 'lucide-react-native';
import { MotiView } from 'moti';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface TryoutCardProps {
  teamName: string;
  game: string;
  role: string;
  tier: string;
  date: string;
  onPress: () => void;
}

export const TryoutCard = ({ teamName, game, role, tier, date, onPress }: TryoutCardProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <MotiView
          animate={{ scale: pressed ? 0.98 : 1, opacity: pressed ? 0.9 : 1 }}
          transition={{ type: 'timing', duration: 100 }}
          className="mb-3"
        >
          <Card variant="glass" intensity={10} className="p-4">
            <View className="flex-row justify-between items-start mb-3">
              <View>
                <Text className="text-lg font-bold text-text-primary">{teamName}</Text>
                <Text className="text-accent font-medium text-sm">{game}</Text>
              </View>
              <View className="bg-bg-secondary px-2 py-1 rounded text-xs border border-white/10">
                <Text className="text-text-secondary font-bold text-xs">{tier}</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-row items-center gap-1">
                <Users size={14} color={Colors.text.secondary} />
                <Text className="text-text-muted text-sm">{role}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Calendar size={14} color={Colors.text.secondary} />
                <Text className="text-text-muted text-sm">
                  {new Date(date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </Card>
        </MotiView>
      )}
    </Pressable>
  );
};
