import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlayerService } from '@/services/player';
import { TeamService } from '@/services/team';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostRecruitmentScreen() {
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  // Fetch team ID
  const { data: team } = useQuery({
    queryKey: ['myTeam', user?.id],
    queryFn: () => TeamService.getMyTeam(user!.id),
    enabled: !!user,
  });

  // Fetch games
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: PlayerService.getGames,
  });

  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [minKd, setMinKd] = useState('');
  const [date, setDate] = useState('');

  const mutation = useMutation({
    mutationFn: TeamService.createRecruitment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamRecruitments', team?.id] });
      showToast('Recruitment posted successfully!', 'success');
      router.back();
    },
    onError: (error: any) => {
      showToast(error.message, 'error');
    },
  });

  const handlePost = () => {
    if (!team || !games) return;
    if (!role || !description || !date) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Default to first game (BGMI) for MVP
    const gameId = games[0].id;

    const recruitmentData = {
      team_id: team.id,
      game_id: gameId,
      role_needed: role,
      tier_target: team.tier,
      description,
      min_kd: minKd ? parseFloat(minKd) : undefined,
      tryout_date: new Date(date).toISOString(), // Simple date parsing for MVP
      status: 'open',
    };

    mutation.mutate(recruitmentData);
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-6">
      <View className="mb-6">
        <Text className="text-3xl font-bold text-white mb-2">Post Recruitment</Text>
        <Text className="text-gray-400">Find the perfect player for your roster.</Text>
      </View>

      <ScrollView className="flex-1 gap-4">
        <Input 
          label="Role Needed" 
          value={role} 
          onChangeText={setRole} 
          placeholder="e.g. Sniper" 
        />
        
        <Input 
          label="Description / Requirements" 
          value={description} 
          onChangeText={setDescription} 
          placeholder="e.g. Must have T2 experience and good comms." 
          multiline
          numberOfLines={3}
          className="h-24 text-top"
        />

        <Input 
          label="Minimum K/D (Optional)" 
          value={minKd} 
          onChangeText={setMinKd} 
          keyboardType="numeric" 
          placeholder="e.g. 3.0" 
        />

        <Input 
          label="Tryout Date (YYYY-MM-DD)" 
          value={date} 
          onChangeText={setDate} 
          placeholder="e.g. 2023-12-25" 
        />

        <Button 
          label="Post Recruitment" 
          onPress={handlePost} 
          isLoading={mutation.isPending} 
          className="mt-4"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
