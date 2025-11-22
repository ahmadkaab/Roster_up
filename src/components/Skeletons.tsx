import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import React from 'react';
import { View } from 'react-native';

export const SkeletonCard = () => {
  return (
    <MotiView
      transition={{ type: 'timing' }}
      className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 mb-3"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Skeleton colorMode="dark" width={150} height={24} />
          <View className="mt-2">
            <Skeleton colorMode="dark" width={100} height={16} />
          </View>
        </View>
        <Skeleton colorMode="dark" width={40} height={20} radius={4} />
      </View>

      <View className="flex-row gap-4 mt-2">
        <Skeleton colorMode="dark" width={80} height={16} />
        <Skeleton colorMode="dark" width={100} height={16} />
      </View>
    </MotiView>
  );
};

export const SkeletonPlayerCard = () => {
  return (
    <MotiView
      transition={{ type: 'timing' }}
      className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 mb-4"
    >
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-row items-center gap-3">
          <Skeleton colorMode="dark" width={64} height={64} radius="round" />
          <View>
            <Skeleton colorMode="dark" width={120} height={24} />
            <View className="mt-2">
              <Skeleton colorMode="dark" width={80} height={16} />
            </View>
          </View>
        </View>
        <Skeleton colorMode="dark" width={40} height={20} radius={12} />
      </View>

      <View className="flex-row gap-3 mb-4">
        <View className="flex-1">
          <Skeleton colorMode="dark" width="100%" height={60} radius={12} />
        </View>
        <View className="flex-1">
          <Skeleton colorMode="dark" width="100%" height={60} radius={12} />
        </View>
      </View>
    </MotiView>
  );
};
