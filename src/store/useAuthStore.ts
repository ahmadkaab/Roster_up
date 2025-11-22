import { supabase } from '@/services/supabase';
import { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface Profile {
  id: string;
  user_type: 'player' | 'team_admin' | null;
  full_name: string | null;
  avatar_url: string | null;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  setSession: (session) => {
    set({ session, user: session?.user ?? null });
    if (session?.user) {
      get().fetchProfile();
    } else {
      set({ profile: null });
    }
  },
  setUser: (user) => set({ user }),
  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!error && data) {
      set({ profile: data as Profile });
    }
  },
}));
