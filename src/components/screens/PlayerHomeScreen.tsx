import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { SkeletonCard } from '@/components/Skeletons';
import { TryoutCard } from '@/components/TryoutCard';
import { Colors } from '@/constants/colors';
import { RecruitmentService } from '@/services/recruitment';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import { Filter } from 'lucide-react-native';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlayerHomeScreen() {
  const [roleFilter, setRoleFilter] = useState('');
  const roles = ['All', 'IGL', 'Assaulter', 'Sniper', 'Support', 'Fragger'];
  
  const { data: recruitments, isLoading, isError, refetch } = useQuery({
    queryKey: ['recruitments', roleFilter],
    queryFn: () => RecruitmentService.getRecruitments({ role: roleFilter || undefined }),
  });

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  return (
    <View className="flex-1 bg-bg-main">
      <SafeAreaView className="flex-1" edges={['top']}>
        <View className="px-4 pt-2 pb-4">
          <Text className="text-3xl font-bold text-text-primary mb-4">Find Tryouts</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ gap: 8 }}
            className="mb-2"
          >
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                onPress={() => setRoleFilter(role === 'All' ? '' : role)}
                className={clsx(
                  "px-4 py-2 rounded-full border",
                  (roleFilter === role || (role === 'All' && roleFilter === ''))
                    ? "bg-accent border-accent"
                    : "bg-bg-secondary border-white/10"
                )}
              >
                <Text className={clsx(
                  "font-bold text-sm",
                  (roleFilter === role || (role === 'All' && roleFilter === ''))
                    ? "text-bg-main"
                    : "text-text-secondary"
                )}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <View className="px-4">
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
                className="px-4"
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
    </View>
  );
}
