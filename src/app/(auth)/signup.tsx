import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/services/supabase';
import { useToastStore } from '@/store/useToastStore';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleSignup = async () => {
    if (!email || !password || !fullName) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast('Account created! Please sign in.', 'success');
      router.replace('/(auth)/login');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-white mb-2">Create Account</Text>
        <Text className="text-gray-400">Join the pro scene today</Text>
      </View>

      <View className="gap-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={fullName}
          onChangeText={setFullName}
        />
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
          label="Sign Up" 
          onPress={handleSignup} 
          isLoading={loading} 
          className="mt-4"
        />

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-400">Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text className="text-accent font-bold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
