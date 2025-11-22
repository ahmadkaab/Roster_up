import { RecruitmentService } from '@/services/recruitment';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
    shortlisted: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
    selected: 'bg-green-500/20 text-green-500 border-green-500/50',
    rejected: 'bg-red-500/20 text-red-500 border-red-500/50',
  };

  const statusKey = status as keyof typeof styles;

  return (
    <View className={clsx('px-3 py-1 rounded-full border', styles[statusKey] || styles.pending)}>
      <Text className={clsx('text-xs font-bold capitalize', styles[statusKey]?.split(' ')[1])}>
        {status}
      </Text>
    </View>
  );
};

export default function ApplicationsScreen() {
  const { user } = useAuthStore();

  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ['myApplications', user?.id],
    queryFn: () => RecruitmentService.getMyApplications(user!.id),
    enabled: !!user,
  });

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-4 pb-0">
      <Text className="text-3xl font-bold text-white mb-6">My Applications</Text>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#4cc9f0" />
        </View>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-lg font-bold text-white">{item.recruitments.teams.name}</Text>
                  <Text className="text-gray-400 text-sm">{item.recruitments.games.name} • {item.recruitments.role_needed}</Text>
                </View>
                <StatusBadge status={item.status} />
              </View>
              <Text className="text-gray-500 text-xs">
                Applied on {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#4cc9f0" />
          }
          ListEmptyComponent={
            <View className="items-center mt-10">
              <Text className="text-gray-500">You haven't applied to any tryouts yet.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
