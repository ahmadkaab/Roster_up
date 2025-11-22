import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonCard } from '@/components/Skeletons';
import { TryoutCard } from '@/components/TryoutCard';
import { Input } from '@/components/ui/Input';
import { Colors } from '@/constants/colors';
import { RecruitmentService } from '@/services/recruitment';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlayerHomeScreen() {
  const [roleFilter, setRoleFilter] = useState('');
  
  const { data: recruitments, isLoading, isError, refetch } = useQuery({
    queryKey: ['recruitments', roleFilter],
    queryFn: () => RecruitmentService.getRecruitments({ role: roleFilter || undefined }),
  });

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-4 pb-0">
      <View className="mb-4">
        <Text className="text-3xl font-bold text-white mb-4">Find Tryouts</Text>
        
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Input 
              placeholder="Filter by Role (e.g. IGL)" 
              value={roleFilter} 
              onChangeText={setRoleFilter}
              className="bg-gray-900"
            />
          </View>
          <TouchableOpacity className="bg-gray-800 w-12 rounded-xl items-center justify-center border border-gray-700">
            <Filter size={20} color={Colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      {isLoading ? (
        <View>
          {[1, 2, 3].map((i) => (
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
            >
              <TryoutCard
                teamName={item.teams.name}
                game={item.games.name}
                role={item.role_needed}
                tier={item.teams.tier}
                date={item.tryout_date}
                onPress={() => router.push(`/tryout/${item.id}`)}
              />
            </MotiView>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor={Colors.accent} />
          }
          ListEmptyComponent={
            <EmptyState
              icon={Filter}
              title="No Tryouts Found"
              description="Try adjusting your filters or check back later for new opportunities."
            />
          }
        />
      )}
    </SafeAreaView>
  );
}
