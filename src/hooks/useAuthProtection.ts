import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useAuthProtection() {
  const { session, setSession, profile } = useAuthStore();
  const segments = useSegments();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    const inOnboarding = segments[0] === 'onboarding';

    if (!session) {
      // If not authenticated and not in auth group, redirect to login
      if (!inAuthGroup) {
        router.replace('/(auth)/login');
      }
    } else {
      // If authenticated
      if (profile) {
        if (!profile.user_type) {
          // If no role, redirect to onboarding
          if (!inOnboarding) {
            router.replace('/onboarding');
          }
        } else {
          // If role exists, redirect to tabs (if in auth or onboarding)
          if (inAuthGroup || inOnboarding) {
            router.replace('/(tabs)');
          }
        }
      }
    }
  }, [session, profile, segments, setSession]);
}
