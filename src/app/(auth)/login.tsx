import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { supabase } from '@/services/supabase';
import { useToastStore } from '@/store/useToastStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
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
    <View className="flex-1 bg-bg-main">
      <StatusBar style="light" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={[Colors.primary, '#1a1b2e', Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      {/* Decorative Elements */}
      <View className="absolute top-[-100] left-[-100] w-[300] h-[300] bg-accent/20 rounded-full blur-[100px]" />
      <View className="absolute bottom-[-50] right-[-50] w-[250] h-[250] bg-blue-600/20 rounded-full blur-[100px]" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="items-center mb-12">
              <View className="w-20 h-20 bg-glass-heavy rounded-3xl items-center justify-center mb-6 border border-glass-stroke">
                <Ionicons name="game-controller" size={40} color={Colors.accent} />
              </View>
              <Text className="text-4xl font-bold text-text-primary mb-2 text-center">
                Welcome Back
              </Text>
              <Text className="text-text-secondary text-lg text-center">
                Sign in to manage your roster
              </Text>
            </View>

            {/* Form */}
            <View className="gap-5 w-full max-w-md self-center">
              <View>
                <Text className="text-text-secondary mb-2 ml-1 font-medium">Email</Text>
                <Input
                  placeholder="player@example.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  containerClassName="bg-glass border-glass-stroke"
                />
              </View>
              
              <View>
                <Text className="text-text-secondary mb-2 ml-1 font-medium">Password</Text>
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  containerClassName="bg-glass border-glass-stroke"
                />
              </View>

              <TouchableOpacity className="self-end">
                <Text className="text-accent font-medium">Forgot Password?</Text>
              </TouchableOpacity>
              
              <Button 
                label="Sign In" 
                onPress={handleLogin} 
                isLoading={loading} 
                className="mt-4 shadow-lg shadow-accent/20"
                variant="primary"
              />

              <View className="flex-row justify-center mt-6 items-center gap-2">
                <Text className="text-text-secondary">Don&apos;t have an account?</Text>
                <Link href="/(auth)/signup" asChild>
                  <TouchableOpacity>
                    <Text className="text-accent font-bold">Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
