import PlayerHomeScreen from '@/components/screens/PlayerHomeScreen';
import TeamDashboardScreen from '@/components/screens/TeamDashboardScreen';
import { Colors } from '@/constants/colors';
import { TeamService } from '@/services/team';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { profile, user } = useAuthStore();

  // Check if team exists for team_admin
  const { data: team, isLoading } = useQuery({
    queryKey: ['myTeam', user?.id],
    queryFn: () => TeamService.getMyTeam(user!.id),
    enabled: !!user && profile?.user_type === 'team_admin',
    retry: false,
  });

  useEffect(() => {
    if (profile?.user_type === 'team_admin' && !isLoading && !team) {
      // If team admin but no team, redirect to setup
      router.replace('/team/setup');
    }
  }, [profile, team, isLoading]);

  if (!profile) {
    return (
      <View className="flex-1 bg-bg-main items-center justify-center">
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  if (profile.user_type === 'team_admin') {
    if (isLoading) {
      return (
        <View className="flex-1 bg-bg-main items-center justify-center">
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      );
    }
    return <TeamDashboardScreen />;
  }

  return <PlayerHomeScreen />;
}
