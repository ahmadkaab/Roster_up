import { clsx } from 'clsx';
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
    <View className={clsx('bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden', className)}>
      {/* Header Gradient Overlay */}
      <View className="h-24 bg-accent/10 absolute top-0 left-0 right-0" />
      
      <View className="p-5">
        {/* Top Row: Identity */}
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-16 h-16 rounded-full bg-gray-800 border-2 border-accent items-center justify-center">
              <User size={32} color="#4cc9f0" />
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
          <View className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            <Text className="text-xs font-bold text-gray-300">{tier}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
            <View className="flex-row items-center gap-2 mb-1">
              <Crosshair size={14} color="#94a3b8" />
              <Text className="text-gray-400 text-xs">K/D Ratio</Text>
            </View>
            <Text className="text-xl font-bold text-white">{kd?.toFixed(2) || '-'}</Text>
          </View>
          <View className="flex-1 bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
            <View className="flex-row items-center gap-2 mb-1">
              <Zap size={14} color="#94a3b8" />
              <Text className="text-gray-400 text-xs">Avg Damage</Text>
            </View>
            <Text className="text-xl font-bold text-white">{damage || '-'}</Text>
          </View>
        </View>

        {/* Info Rows */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Smartphone size={14} color="#64748b" />
            <Text className="text-gray-400 text-sm">{device || 'No device info'}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Clock size={14} color="#64748b" />
            <Text className="text-gray-400 text-sm">{availability || 'Availability not set'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
