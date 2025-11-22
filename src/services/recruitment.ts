import { supabase } from './supabase';

export interface Recruitment {
  id: string;
  team_id: string;
  game_id: string;
  role_needed: string;
  tier_target: string;
  description: string;
  min_kd?: number;
  tryout_date: string;
  status: string;
  teams: {
    name: string;
    logo_url: string | null;
    tier: string;
  };
  games: {
    name: string;
  };
}

export const RecruitmentService = {
  async getRecruitments(filters?: { gameId?: string; role?: string }) {
    let query = supabase
      .from('recruitments')
      .select(`
        *,
        teams (name, logo_url, tier),
        games (name)
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (filters?.gameId) {
      query = query.eq('game_id', filters.gameId);
    }
    if (filters?.role) {
      query = query.eq('role_needed', filters.role);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Recruitment[];
  },

  async applyToRecruitment(recruitmentId: string, playerId: string) {
    const { data, error } = await supabase
      .from('recruitment_applications')
      .insert({
        recruitment_id: recruitmentId,
        player_id: playerId,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new Error('You have already applied to this tryout.');
      }
      throw error;
    }
    return data;
  },

  async getMyApplications(playerId: string) {
    const { data, error } = await supabase
      .from('recruitment_applications')
      .select(`
        *,
        recruitments (
          *,
          teams (name),
          games (name)
        )
      `)
      .eq('player_id', playerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },
};
