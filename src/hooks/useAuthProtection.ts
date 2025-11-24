import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { router, useRootNavigationState, useSegments } from 'expo-router';
import { useEffect } from 'react';

export function useAuthProtection() {
  const { session, setSession, profile } = useAuthStore();
  const segments = useSegments();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    // Wrap in setTimeout to avoid "Attempted to navigate before mounting the Root Layout component"
    // This ensures the navigation tree is fully mounted before we try to redirect.
    const timer = setTimeout(() => {
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
    }, 100); // Small delay to ensure mount

    return () => clearTimeout(timer);
  }, [session, profile, segments, rootNavigationState?.key]);
}
