import { Button } from '@/components/ui/Button';
import { TeamService } from '@/services/team';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, Star, User, X } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecruitmentManagementScreen() {
  const { id } = useLocalSearchParams();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();

  const { data: applicants, isLoading } = useQuery({
    queryKey: ['recruitmentApplicants', id],
    queryFn: () => TeamService.getRecruitmentApplicants(id as string),
  });

  const statusMutation = useMutation({
    mutationFn: ({ appId, status }: { appId: string; status: string }) => 
      TeamService.updateApplicationStatus(appId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recruitmentApplicants', id] });
      showToast('Status updated', 'success');
    },
  });

  const handleStatusUpdate = (appId: string, status: string) => {
    statusMutation.mutate({ appId, status });
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-bg-main items-center justify-center">
        <ActivityIndicator size="large" color="#4cc9f0" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-bg-main p-4">
      <View className="flex-row items-center mb-6 gap-4">
        <Button variant="ghost" label="Back" size="sm" onPress={() => router.back()} className="bg-gray-800 rounded-full px-3" />
        <Text className="text-2xl font-bold text-white">Applicants</Text>
      </View>

      <FlatList
        data={applicants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 mb-3">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center border border-gray-700">
                <User size={24} color="#94a3b8" />
              </View>
              <View>
                <Text className="text-lg font-bold text-white">{item.player_cards?.ign || item.profiles.full_name}</Text>
                <Text className="text-gray-400 text-sm">{item.player_cards?.primary_role || 'No Role'} • KD: {item.player_cards?.kd_ratio || '-'}</Text>
              </View>
            </View>

            <View className="flex-row gap-2 justify-end">
              {item.status === 'pending' && (
                <>
                  <TouchableOpacity 
                    onPress={() => handleStatusUpdate(item.id, 'rejected')}
                    className="bg-red-500/10 border border-red-500/50 p-2 rounded-lg"
                  >
                    <X size={20} color="#ef4444" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => handleStatusUpdate(item.id, 'shortlisted')}
                    className="bg-blue-500/10 border border-blue-500/50 p-2 rounded-lg"
                  >
                    <Star size={20} color="#3b82f6" />
                  </TouchableOpacity>
                </>
              )}
              {item.status === 'shortlisted' && (
                <TouchableOpacity 
                  onPress={() => handleStatusUpdate(item.id, 'selected')}
                  className="bg-green-500/10 border border-green-500/50 p-2 rounded-lg flex-row items-center gap-2 px-3"
                >
                  <Check size={20} color="#22c55e" />
                  <Text className="text-green-500 font-bold">Select</Text>
                </TouchableOpacity>
              )}
              {item.status !== 'pending' && item.status !== 'shortlisted' && (
                <View className={clsx(
                  "px-3 py-2 rounded-lg border",
                  item.status === 'selected' ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50"
                )}>
                  <Text className={clsx(
                    "font-bold capitalize",
                    item.status === 'selected' ? "text-green-500" : "text-red-500"
                  )}>{item.status}</Text>
                </View>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text className="text-gray-500">No applicants yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
