import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex-1 bg-bg-main items-center justify-center">
      <ActivityIndicator size="large" color="#4cc9f0" />
    </View>
  );
}
