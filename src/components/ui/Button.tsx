import { Colors } from '@/constants/colors';
import { clsx } from 'clsx';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  label: string;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading,
  label,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'flex-row items-center justify-center rounded-xl';
  
  const variants = {
    primary: 'bg-accent', // We might want to use LinearGradient here in the future
    secondary: 'bg-bg-secondary border border-white/10',
    ghost: 'bg-transparent',
    danger: 'bg-danger',
  };

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3.5',
    lg: 'px-8 py-4',
  };

  const textStyles = {
    primary: 'text-bg-main font-bold text-lg',
    secondary: 'text-text-primary font-medium',
    ghost: 'text-text-secondary font-medium',
    danger: 'text-white font-bold',
  };

  return (
    <TouchableOpacity
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50',
        className
      )}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.primary : Colors.white} />
      ) : (
        <Text className={clsx('text-base', textStyles[variant])}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
