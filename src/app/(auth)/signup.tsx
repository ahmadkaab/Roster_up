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
      <View className="absolute top-[-100] right-[-100] w-[300] h-[300] bg-accent/20 rounded-full blur-[100px]" />
      <View className="absolute bottom-[-50] left-[-50] w-[250] h-[250] bg-purple-600/20 rounded-full blur-[100px]" />

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
            <View className="items-center mb-10">
              <View className="w-16 h-16 bg-glass-heavy rounded-2xl items-center justify-center mb-4 border border-glass-stroke">
                <Ionicons name="person-add" size={32} color={Colors.accent} />
              </View>
              <Text className="text-3xl font-bold text-text-primary mb-2 text-center">
                Create Account
              </Text>
              <Text className="text-text-secondary text-center">
                Join the pro scene today
              </Text>
            </View>

            {/* Form */}
            <View className="gap-5 w-full max-w-md self-center">
              <View>
                <Text className="text-text-secondary mb-2 ml-1 font-medium">Full Name</Text>
                <Input
                  placeholder="John Doe"
                  value={fullName}
                  onChangeText={setFullName}
                  containerClassName="bg-glass border-glass-stroke"
                />
              </View>

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
              
              <Button 
                label="Sign Up" 
                onPress={handleSignup} 
                isLoading={loading} 
                className="mt-4 shadow-lg shadow-accent/20"
                variant="primary"
              />

              <View className="flex-row justify-center mt-6 items-center gap-2">
                <Text className="text-text-secondary">Already have an account?</Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-accent font-bold">Sign In</Text>
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
