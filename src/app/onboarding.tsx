import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/colors';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useToastStore } from '@/store/useToastStore';
import { clsx } from 'clsx';
import { router } from 'expo-router';
import { User, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const { user } = useAuthStore();
  const { showToast } = useToastStore();
  const [selectedRole, setSelectedRole] = useState<'player' | 'team_admin' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole || !user) return;

    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ user_type: selectedRole })
      .eq('id', user.id);

    if (error) {
      showToast(error.message, 'error');
    } else {
      showToast(`Welcome, ${selectedRole === 'player' ? 'Player' : 'Team Manager'}!`, 'success');
      router.replace('/(tabs)');
    }
    setLoading(false);
  };


  return (
    <SafeAreaView className="flex-1 bg-bg-main p-6 justify-center">
      <View className="items-center mb-10">
        <Text className="text-3xl font-bold text-white mb-2">Who are you?</Text>
        <Text className="text-gray-400 text-center">
          Choose how you want to use RosterUp
        </Text>
      </View>

      <View className="gap-4 mb-8">
        <TouchableOpacity
          onPress={() => setSelectedRole('player')}
          className={clsx(
            'p-6 rounded-2xl border-2 flex-row items-center gap-4',
            selectedRole === 'player'
              ? 'bg-accent/10 border-accent'
              : 'bg-gray-900/50 border-gray-800'
          )}
        >
          <View className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center">
            <User size={24} color={selectedRole === 'player' ? Colors.accent : Colors.secondary} />
          </View>
          <View className="flex-1">
            <Text className={clsx('text-lg font-bold', selectedRole === 'player' ? 'text-white' : 'text-gray-400')}>
              I&apos;m a Player
            </Text>
            <Text className="text-gray-500 text-sm">
              Build your card, find teams, and get scouted.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedRole('team_admin')}
          className={clsx(
            'p-6 rounded-2xl border-2 flex-row items-center gap-4',
            selectedRole === 'team_admin'
              ? 'bg-accent/10 border-accent'
              : 'bg-gray-900/50 border-gray-800'
          )}
        >
          <View className="w-12 h-12 rounded-full bg-gray-800 items-center justify-center">
            <Users size={24} color={selectedRole === 'team_admin' ? Colors.accent : Colors.secondary} />
          </View>
          <View className="flex-1">
            <Text className={clsx('text-lg font-bold', selectedRole === 'team_admin' ? 'text-white' : 'text-gray-400')}>
              I manage a Team
            </Text>
            <Text className="text-gray-500 text-sm">
              Post tryouts, review applicants, and build your roster.
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <Button
        label="Continue"
        onPress={handleContinue}
        disabled={!selectedRole}
        isLoading={loading}
      />
    </SafeAreaView>
  );
}
