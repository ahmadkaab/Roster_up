import { ErrorState } from '@/components/ErrorState';
import { PlayerCard } from '@/components/PlayerCard';
import { SkeletonPlayerCard } from '@/components/Skeletons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PlayerCardData, PlayerService } from '@/services/player';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const { user, profile } = useAuthStore();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [ign, setIgn] = useState('');
  const [role, setRole] = useState('');
  const [kd, setKd] = useState('');
  const [damage, setDamage] = useState('');
  const [device, setDevice] = useState('');
  const [availability, setAvailability] = useState('');

  // Fetch Player Card
  const { data: card, isLoading, isError, refetch } = useQuery({
    queryKey: ['playerCard', user?.id],
    queryFn: () => PlayerService.getPlayerCard(user!.id),
    enabled: !!user,
  });

  // Initialize form when card loads
  useEffect(() => {
    if (card) {
      setIgn(card.ign);
      setRole(card.primary_role);
      setKd(card.kd_ratio?.toString() || '');
      setDamage(card.avg_damage?.toString() || '');
      setDevice(card.device_model || '');
      setAvailability(card.availability || '');
    } else if (profile?.full_name) {
        // Pre-fill with profile name if no card exists
        setIgn(profile.full_name);
    }
  }, [card, profile]);

  // Mutation to save card
  const mutation = useMutation({
    mutationFn: PlayerService.createOrUpdatePlayerCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerCard', user?.id] });
      showToast('Player Card saved successfully!', 'success');
      setIsEditing(false);
    },
    onError: (error: any) => {
      showToast(error.message, 'error');
    },
  });

  const handleSave = () => {
    if (!user) return;
    if (!ign || !role) {
      showToast('IGN and Role are required', 'error');
      return;
    }

    const cardData: PlayerCardData = {
      player_id: user.id,
      ign,
      primary_role: role,
      // Hardcoded game ID for MVP (BGMI) - In real app, select from dropdown
      // primary_game_id: '...', 
      kd_ratio: kd ? parseFloat(kd) : undefined,
      avg_damage: damage ? parseInt(damage) : undefined,
      device_model: device,
      availability,
    };

    mutation.mutate(cardData);
  };

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-bg-main p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-3xl font-bold text-white">My Profile</Text>
        </View>
        <SkeletonPlayerCard />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-bg-main">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-3xl font-bold text-text-primary">My Profile</Text>
            {!isEditing && (
              <Button 
                label="Edit Card" 
                size="sm" 
                variant="secondary" 
                onPress={() => setIsEditing(true)} 
              />
            )}
          </View>

          {/* Live Preview Section */}
          <View className="mb-8">
            <View className="flex-row items-center gap-2 mb-4">
              <View className="w-1 h-6 bg-accent rounded-full" />
              <Text className="text-text-secondary font-bold tracking-wider text-xs uppercase">Live Preview</Text>
            </View>
            <PlayerCard
              ign={ign || 'Your IGN'}
              role={role || 'Role'}
              game="BGMI" // Static for MVP
              kd={kd ? parseFloat(kd) : undefined}
              damage={damage ? parseInt(damage) : undefined}
              device={device}
              availability={availability}
              tier="T3" // Static for MVP
            />
          </View>

          {/* Edit Form */}
          {isEditing ? (
            <View className="gap-5 mb-20">
              <View className="flex-row items-center gap-2 mb-2">
                <View className="w-1 h-6 bg-accent-secondary rounded-full" />
                <Text className="text-text-secondary font-bold tracking-wider text-xs uppercase">Edit Details</Text>
              </View>
              
              <View className="gap-4">
                <Input 
                  label="In-Game Name (IGN)" 
                  value={ign} 
                  onChangeText={setIgn} 
                  placeholder="e.g. Jonathan" 
                  containerClassName="bg-glass border-glass-stroke"
                />
                <Input 
                  label="Primary Role" 
                  value={role} 
                  onChangeText={setRole} 
                  placeholder="e.g. IGL, Assaulter" 
                  containerClassName="bg-glass border-glass-stroke"
                />
                
                <View className="flex-row gap-4">
                  <View className="flex-1">
                    <Input 
                      label="K/D Ratio" 
                      value={kd} 
                      onChangeText={setKd} 
                      keyboardType="numeric" 
                      placeholder="3.5" 
                      containerClassName="bg-glass border-glass-stroke"
                    />
                  </View>
                  <View className="flex-1">
                    <Input 
                      label="Avg Damage" 
                      value={damage} 
                      onChangeText={setDamage} 
                      keyboardType="numeric" 
                      placeholder="850" 
                      containerClassName="bg-glass border-glass-stroke"
                    />
                  </View>
                </View>

                <Input 
                  label="Device Model" 
                  value={device} 
                  onChangeText={setDevice} 
                  placeholder="e.g. iPhone 14 Pro" 
                  containerClassName="bg-glass border-glass-stroke"
                />
                <Input 
                  label="Availability" 
                  value={availability} 
                  onChangeText={setAvailability} 
                  placeholder="e.g. 6 PM - 10 PM" 
                  containerClassName="bg-glass border-glass-stroke"
                />
              </View>

              <View className="flex-row gap-4 mt-4">
                <View className="flex-1">
                  <Button label="Cancel" variant="ghost" onPress={() => setIsEditing(false)} />
                </View>
                <View className="flex-1">
                  <Button label="Save Card" onPress={handleSave} isLoading={mutation.isPending} />
                </View>
              </View>
            </View>
          ) : (
            <View className="items-center py-8">
              <Text className="text-text-muted text-center">
                Tap &quot;Edit Card&quot; above to update your stats and info.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
