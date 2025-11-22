import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { RecruitmentService } from '@/services/recruitment';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Calendar, Shield, Target } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TryoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const { data: recruitment, isLoading } = useQuery({
    queryKey: ['recruitment', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('recruitments')
        .select(`
          *,
          teams (*),
          games (*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const applyMutation = useMutation({
    mutationFn: () => RecruitmentService.applyToRecruitment(id as string, user!.id),
    onSuccess: () => {
      showToast('Application sent successfully!', 'success');
      router.back();
    },
    onError: (error: any) => {
      showToast(error.message, 'error');
    },
  });

  if (isLoading || !recruitment) {
    return (
      <View className="flex-1 bg-bg-main items-center justify-center">
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-main">
      <ScrollView className="flex-1">
        {/* Header Image Placeholder */}
        <View className="h-40 bg-gray-800 w-full mb-4 relative">
          <View className="absolute top-4 left-4 z-10">
            <Button 
              label="Back" 
              variant="ghost" 
              size="sm" 
              onPress={() => router.back()} 
              className="bg-black/50 rounded-full px-3"
            />
          </View>
          <View className="absolute bottom-4 left-4">
            <Text className="text-3xl font-bold text-white">{recruitment.teams.name}</Text>
            <Text className="text-accent font-bold">{recruitment.teams.tier} Team</Text>
          </View>
        </View>

        <View className="p-6 pt-0">
          {/* Key Info Grid */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-gray-900 p-3 rounded-xl border border-gray-800 items-center">
              <Target size={20} color={Colors.accent} className="mb-2" />
              <Text className="text-gray-400 text-xs">GAME</Text>
              <Text className="text-white font-bold">{recruitment.games.name}</Text>
            </View>
            <View className="flex-1 bg-gray-900 p-3 rounded-xl border border-gray-800 items-center">
              <Shield size={20} color={Colors.accent} className="mb-2" />
              <Text className="text-gray-400 text-xs">ROLE</Text>
              <Text className="text-white font-bold">{recruitment.role_needed}</Text>
            </View>
            <View className="flex-1 bg-gray-900 p-3 rounded-xl border border-gray-800 items-center">
              <Calendar size={20} color={Colors.accent} className="mb-2" />
              <Text className="text-gray-400 text-xs">DATE</Text>
              <Text className="text-white font-bold text-xs">
                {new Date(recruitment.tryout_date).toLocaleDateString()}
              </Text>
            </View>
          </View>

          {/* Requirements */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-white mb-3">Requirements</Text>
            <View className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 gap-2">
              {recruitment.min_kd && (
                <Text className="text-gray-300">• Minimum KD: {recruitment.min_kd}</Text>
              )}
              <Text className="text-gray-300">• {recruitment.description}</Text>
            </View>
          </View>

          {/* Action Button */}
          <Button 
            label="Apply for Tryout" 
            size="lg" 
            onPress={() => applyMutation.mutate()} 
            isLoading={applyMutation.isPending}

          />
          <Text className="text-gray-500 text-xs text-center mt-3">
            Your Player Card will be sent to the team.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
