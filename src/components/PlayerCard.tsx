import { Colors } from '@/constants/colors';
import { clsx } from 'clsx';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Crosshair, Smartphone, User, Zap } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface PlayerCardProps {
  ign: string;
  role: string;
  game: string;
  kd?: number;
  damage?: number;
  device?: string;
  availability?: string;
  tier?: string;
  className?: string;
}

export const PlayerCard = ({
  ign,
  role,
  game,
  kd,
  damage,
  device,
  availability,
  tier = 'T3',
  className,
}: PlayerCardProps) => {
  return (
    <View className={clsx('rounded-2xl overflow-hidden', className)}>
      <LinearGradient
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-[1px] rounded-2xl"
      >
        <BlurView intensity={20} tint="dark" className="bg-gray-900/60 p-5">
          {/* Header Gradient Overlay */}
          <View className="absolute top-0 left-0 right-0 h-24 bg-accent/5" />

          {/* Top Row: Identity */}
          <View className="flex-row justify-between items-start mb-6">
            <View className="flex-row items-center gap-3">
              <View className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent items-center justify-center overflow-hidden">
                <User size={32} color={Colors.accent} />
              </View>
              <View>
                <Text className="text-2xl font-bold text-white">{ign}</Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-accent font-bold text-sm">{game}</Text>
                  <View className="w-1 h-1 rounded-full bg-gray-600" />
                  <Text className="text-gray-400 text-sm">{role}</Text>
                </View>
              </View>
            </View>
            <View className="bg-gray-800/80 px-3 py-1 rounded-full border border-gray-700">
              <Text className="text-xs font-bold text-gray-300">{tier}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
              <View className="flex-row items-center gap-2 mb-1">
                <Crosshair size={14} color={Colors.secondary} />
                <Text className="text-gray-400 text-xs">K/D Ratio</Text>
              </View>
              <Text className="text-xl font-bold text-white">{kd?.toFixed(2) || '-'}</Text>
            </View>
            <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
              <View className="flex-row items-center gap-2 mb-1">
                <Zap size={14} color={Colors.secondary} />
                <Text className="text-gray-400 text-xs">Avg Damage</Text>
              </View>
              <Text className="text-xl font-bold text-white">{damage || '-'}</Text>
            </View>
          </View>

          {/* Info Rows */}
          <View className="gap-2">
            <View className="flex-row items-center gap-2">
              <Smartphone size={14} color={Colors.gray[500]} />
              <Text className="text-gray-400 text-sm">{device || 'No device info'}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Clock size={14} color={Colors.gray[500]} />
              <Text className="text-gray-400 text-sm">{availability || 'Availability not set'}</Text>
            </View>
          </View>
        </BlurView>
      </LinearGradient>
    </View>
  );
};
