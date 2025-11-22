import { Button } from '@/components/ui/Button';
import { TeamService } from '@/services/team';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Users } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeamDashboardScreen() {
  const { user } = useAuthStore();

  const { data: team, isLoading: teamLoading } = useQuery({
    queryKey: ['myTeam', user?.id],
    queryFn: () => TeamService.getMyTeam(user!.id),
    enabled: !!user,
  });

  const { data: recruitments, isLoading: recruitmentsLoading, refetch } = useQuery({
    queryKey: ['teamRecruitments', team?.id],
    queryFn: () => TeamService.getTeamRecruitments(team!.id),
    enabled: !!team,
  });

  if (teamLoading) {
    return (
      <View className="flex-1 bg-bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#4cc9f0" />
      </View>
    );
  }

  if (!team) {
    // Redirect to setup if no team found (handled in component or parent, but safe fallback here)
    return (
      <SafeAreaView className="flex-1 bg-bg-main items-center justify-center p-6">
        <Text className="text-white text-xl font-bold mb-4">No Team Found</Text>
        <Button label="Create Team" onPress={() => router.push('/team/setup')} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-4 pb-0">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-3xl font-bold text-white">{team.name}</Text>
          <Text className="text-accent font-bold">{team.tier} • {team.region}</Text>
        </View>
        <Button 
          label="Post" 
          size="sm" 
          onPress={() => router.push('/team/post-recruitment')}
          className="px-4"
        />
      </View>

      <Text className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-wider">Active Recruitments</Text>

      {recruitmentsLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4cc9f0" />
        </View>
      ) : (
        <FlatList
          data={recruitments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-lg font-bold text-white">{item.games.name}</Text>
                  <Text className="text-gray-400 text-sm">{item.role_needed}</Text>
                </View>
                <View className="bg-gray-800 px-2 py-1 rounded flex-row items-center gap-1">
                  <Users size={12} color="#94a3b8" />
                  <Text className="text-gray-400 font-bold text-xs">
                    {item.recruitment_applications[0]?.count || 0} Applicants
                  </Text>
                </View>
              </View>
              <Button 
                label="Manage" 
                variant="secondary" 
                size="sm" 
                onPress={() => router.push(`/team/recruitment/${item.id}`)}
                className="mt-2"
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={recruitmentsLoading} onRefresh={refetch} tintColor="#4cc9f0" />
          }
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text className="text-gray-500">No active recruitments.</Text>
              <Text className="text-gray-600 text-sm mt-1">Post a tryout to find players.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
