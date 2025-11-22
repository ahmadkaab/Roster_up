import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { clsx } from 'clsx';
import { BlurView } from 'expo-blur';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export function GlassTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0">
      <BlurView
        intensity={30}
        tint="dark"
        className="flex-row h-20 pb-5 items-center justify-around bg-gray-900/80 border-t border-white/5"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = options.tabBarIcon;

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              activeOpacity={0.7}
              className="items-center justify-center flex-1 h-full"
            >
              <View className={clsx(
                'p-2 rounded-xl transition-all',
                isFocused && 'bg-accent/10'
              )}>
                {Icon && <Icon color={isFocused ? '#4cc9f0' : '#94a3b8'} size={24} focused={isFocused} />}
              </View>
              {isFocused && (
                <View className="w-1 h-1 rounded-full bg-accent mt-1" />
              )}
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}
