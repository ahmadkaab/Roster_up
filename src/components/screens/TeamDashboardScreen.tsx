import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonCard } from '@/components/Skeletons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/colors';
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
        <ActivityIndicator size="large" color={Colors.accent} />
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

  // Calculate stats
  const activeRecruitments = recruitments?.length || 0;
  const totalApplicants = recruitments?.reduce((acc, curr) => acc + (curr.recruitment_applications[0]?.count || 0), 0) || 0;

  return (
    <View className="flex-1 bg-bg-main">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="p-4 pb-0 flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-6">
            <View>
              <Text className="text-3xl font-bold text-text-primary">{team.name}</Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="bg-bg-secondary px-2 py-0.5 rounded border border-white/10">
                  <Text className="text-accent font-bold text-xs">{team.tier}</Text>
                </View>
                <Text className="text-text-muted text-sm">• {team.region}</Text>
              </View>
            </View>
            <Button 
              label="Post" 
              size="sm" 
              onPress={() => router.push('/team/post-recruitment')}
              className="px-4"
            />
          </View>

          {/* Stats Row */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-bg-secondary/50 p-3 rounded-xl border border-white/5">
              <Text className="text-text-muted text-xs font-medium mb-1">Active Posts</Text>
              <Text className="text-2xl font-bold text-text-primary">{activeRecruitments}</Text>
            </View>
            <View className="flex-1 bg-bg-secondary/50 p-3 rounded-xl border border-white/5">
              <Text className="text-text-muted text-xs font-medium mb-1">Total Applicants</Text>
              <Text className="text-2xl font-bold text-text-primary">{totalApplicants}</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-1 h-6 bg-accent rounded-full" />
            <Text className="text-text-secondary font-bold tracking-wider text-xs uppercase">Recruitments</Text>
          </View>

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
                  className="mb-3"
                >
                  <Card variant="glass" intensity={10} className="p-4">
                    <View className="flex-row justify-between items-start mb-3">
                      <View>
                        <Text className="text-lg font-bold text-text-primary">{item.games.name}</Text>
                        <Text className="text-accent text-sm font-medium">{item.role_needed}</Text>
                      </View>
                      <View className="bg-bg-secondary px-2 py-1 rounded flex-row items-center gap-1 border border-white/10">
                        <Users size={12} color={Colors.text.secondary} />
                        <Text className="text-text-secondary font-bold text-xs">
                          {item.recruitment_applications[0]?.count || 0}
                        </Text>
                      </View>
                    </View>
                    
                    <Button 
                      label="Manage Applicants" 
                      variant="secondary" 
                      size="sm" 
                      onPress={() => router.push(`/team/recruitment/${item.id}`)}
                      className="mt-2"
                    />
                  </Card>
                </MotiView>
              )}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshControl={
                <RefreshControl refreshing={recruitmentsLoading} onRefresh={refetchRecruitments} tintColor={Colors.accent} />
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
        </View>
      </SafeAreaView>
    </View>
  );
}
