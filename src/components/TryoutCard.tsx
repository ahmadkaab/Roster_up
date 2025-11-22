import { Calendar, Users } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 mb-3"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Text className="text-lg font-bold text-white">{teamName}</Text>
          <Text className="text-accent font-medium text-sm">{game}</Text>
        </View>
        <View className="bg-gray-800 px-2 py-1 rounded text-xs">
          <Text className="text-gray-400 font-bold text-xs">{tier}</Text>
        </View>
      </View>

      <View className="flex-row gap-4">
        <View className="flex-row items-center gap-1">
          <Users size={14} color="#94a3b8" />
          <Text className="text-gray-400 text-sm">{role}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <Calendar size={14} color="#94a3b8" />
          <Text className="text-gray-400 text-sm">
            {new Date(date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
