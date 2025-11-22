import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonCard } from '@/components/Skeletons';
import { Button } from '@/components/ui/Button';
import { TeamService } from '@/services/team';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { ClipboardList, Users } from 'lucide-react-native';
import { MotiView } from 'moti';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TeamDashboardScreen() {
  const { user } = useAuthStore();

  const { data: team, isLoading: teamLoading, isError: teamError, refetch: refetchTeam } = useQuery({
    queryKey: ['myTeam', user?.id],
    queryFn: () => TeamService.getMyTeam(user!.id),
    enabled: !!user,
  });

  const { data: recruitments, isLoading: recruitmentsLoading, isError: recruitmentsError, refetch: refetchRecruitments } = useQuery({
    queryKey: ['teamRecruitments', team?.id],
    queryFn: () => TeamService.getTeamRecruitments(team!.id),
    enabled: !!team,
  });

  if (teamError) {
    return <ErrorState onRetry={refetchTeam} message="Failed to load team data." />;
  }

  if (recruitmentsError) {
    return <ErrorState onRetry={refetchRecruitments} message="Failed to load recruitments." />;
  }

  if (teamLoading) {
    return (
      <View className="flex-1 bg-bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#4cc9f0" />
      </View>
    );
  }

  if (!team) {
    return (
      <SafeAreaView className="flex-1 bg-bg-main items-center justify-center p-6">
        <EmptyState
          icon={Users}
          title="No Team Found"
          description="You haven't created a team yet. Set up your team to start recruiting."
          actionLabel="Create Team"
          onAction={() => router.push('/team/setup')}
        />
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
        <View>
          {[1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      ) : (
        <FlatList
          data={recruitments}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MotiView
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', delay: index * 100 }}
              className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 mb-3"
            >
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
            </MotiView>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={recruitmentsLoading} onRefresh={refetchRecruitments} tintColor="#4cc9f0" />
          }
          ListEmptyComponent={
            <EmptyState
              icon={ClipboardList}
              title="No Active Recruitments"
              description="Post a tryout listing to find players for your team."
              actionLabel="Post Recruitment"
              onAction={() => router.push('/team/post-recruitment')}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
