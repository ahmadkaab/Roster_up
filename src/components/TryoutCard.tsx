import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
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
          className="mb-3 rounded-xl overflow-hidden"
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-[1px] rounded-xl"
          >
            <BlurView intensity={10} tint="dark" className="bg-gray-900/70 p-4">
              <View className="flex-row justify-between items-start mb-3">
                <View>
                  <Text className="text-lg font-bold text-white">{teamName}</Text>
                  <Text className="text-accent font-medium text-sm">{game}</Text>
                </View>
                <View className="bg-gray-800/80 px-2 py-1 rounded text-xs border border-gray-700">
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
            </BlurView>
          </LinearGradient>
        </MotiView>
      )}
    </Pressable>
  );
};
