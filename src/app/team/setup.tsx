import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TeamData, TeamService } from '@/services/team';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeamSetupScreen() {
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [region, setRegion] = useState('India');
  const [tier, setTier] = useState('T3');

  const mutation = useMutation({
    mutationFn: TeamService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myTeam', user?.id] });
      showToast('Team created successfully!', 'success');
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      showToast(error.message, 'error');
    },
  });

  const handleCreate = () => {
    if (!user) return;
    if (!name) {
      showToast('Team Name is required', 'error');
      return;
    }

    const teamData: TeamData = {
      owner_id: user.id,
      name,
      region,
      tier,
    };

    mutation.mutate(teamData);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-6">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-white mb-2">Create Your Team</Text>
        <Text className="text-gray-400">
          Start your journey to the top.
        </Text>
      </View>

      <View className="gap-4">
        <Input 
          label="Team Name" 
          value={name} 
          onChangeText={setName} 
          placeholder="e.g. Soul Esports" 
        />
        <Input 
          label="Region" 
          value={region} 
          onChangeText={setRegion} 
          placeholder="e.g. India" 
        />
        <Input 
          label="Tier (T1/T2/T3)" 
          value={tier} 
          onChangeText={setTier} 
          placeholder="e.g. T3" 
        />

        <Button 
          label="Create Team" 
          onPress={handleCreate} 
          isLoading={mutation.isPending} 
          className="mt-4"
        />
      </View>
    </SafeAreaView>
  );
}
