import { clsx } from 'clsx';
import { BlurView } from 'expo-blur';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'glass' | 'outline';
  intensity?: number;
}

export const Card = ({ 
  children, 
  className, 
  variant = 'glass', 
  intensity = 10,
  ...props 
}: CardProps) => {
  const baseStyles = 'rounded-2xl overflow-hidden';
  
  const variants = {
    default: 'bg-bg-secondary border border-white/5',
    glass: 'border border-white/10',
    outline: 'bg-transparent border border-white/10',
  };

  if (variant === 'glass') {
    return (
      <View className={clsx(baseStyles, variants.glass, className)} {...props}>
        <BlurView intensity={intensity} tint="dark" className="p-4">
          {children}
        </BlurView>
      </View>
    );
  }

  return (
    <View className={clsx(baseStyles, variants[variant], 'p-4', className)} {...props}>
      {children}
    </View>
  );
};
