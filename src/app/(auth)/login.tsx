import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/services/supabase';
import { useToastStore } from '@/store/useToastStore';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleLogin = async () => {
    if (!email || !password) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Welcome back!', 'success');
      router.replace('/(tabs)');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-white mb-2">RosterUp</Text>
        <Text className="text-gray-400 text-lg">Esports Recruitment Platform</Text>
      </View>

      <View className="gap-4">
        <Input
          label="Email"
          placeholder="player@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Button 
          label="Sign In" 
          onPress={handleLogin} 
          isLoading={loading} 
          className="mt-4"
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-400">Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text className="text-accent font-bold">Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
