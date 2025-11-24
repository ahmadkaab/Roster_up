import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
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
    <Card variant="glass" intensity={20} className={clsx('p-0', className)}>
      <View className="p-5">
        {/* Header Gradient Overlay */}
        <View className="absolute top-0 left-0 right-0 h-24 bg-accent/5" />

        {/* Top Row: Identity */}
        <View className="flex-row justify-between items-start mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-16 h-16 rounded-full bg-bg-secondary border-2 border-accent items-center justify-center overflow-hidden">
              <User size={32} color={Colors.accent} />
            </View>
            <View>
              <Text className="text-2xl font-bold text-text-primary">{ign}</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-accent font-bold text-sm">{game}</Text>
                <View className="w-1 h-1 rounded-full bg-text-muted" />
                <Text className="text-text-muted text-sm">{role}</Text>
              </View>
            </View>
          </View>
          <View className="bg-bg-secondary px-3 py-1 rounded-full border border-white/10">
            <Text className="text-xs font-bold text-text-secondary">{tier}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-2 mb-1">
              <Crosshair size={14} color={Colors.text.secondary} />
              <Text className="text-text-muted text-xs">K/D Ratio</Text>
            </View>
            <Text className="text-xl font-bold text-text-primary">{kd?.toFixed(2) || '-'}</Text>
          </View>
          <View className="flex-1 bg-black/20 p-3 rounded-xl border border-white/5">
            <View className="flex-row items-center gap-2 mb-1">
              <Zap size={14} color={Colors.text.secondary} />
              <Text className="text-text-muted text-xs">Avg Damage</Text>
            </View>
            <Text className="text-xl font-bold text-text-primary">{damage || '-'}</Text>
          </View>
        </View>

        {/* Info Rows */}
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Smartphone size={14} color={Colors.text.secondary} />
            <Text className="text-text-muted text-sm">{device || 'No device info'}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Clock size={14} color={Colors.text.secondary} />
            <Text className="text-text-muted text-sm">{availability || 'Availability not set'}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};
