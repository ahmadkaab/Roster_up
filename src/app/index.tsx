import { Colors } from '@/constants/colors';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 bg-bg-main items-center justify-center">
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
}
