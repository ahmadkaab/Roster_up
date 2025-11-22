import { supabase } from './supabase';

export interface TeamData {
  id?: string;
  owner_id: string;
  name: string;
  tier: string;
  region: string;
  logo_url?: string;
}

export const TeamService = {
  async getMyTeam(ownerId: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('owner_id', ownerId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createTeam(teamData: TeamData) {
    const { data, error } = await supabase
      .from('teams')
      .insert(teamData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createRecruitment(recruitmentData: any) {
    const { data, error } = await supabase
      .from('recruitments')
      .insert(recruitmentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getTeamRecruitments(teamId: string) {
    const { data, error } = await supabase
      .from('recruitments')
      .select(`
        *,
        games (name),
        recruitment_applications (count)
      `)
      .eq('team_id', teamId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getRecruitmentApplicants(recruitmentId: string) {
    const { data, error } = await supabase
      .from('recruitment_applications')
      .select(`
        *,
        profiles:player_id (
          full_name,
          avatar_url
        ),
        player_cards:player_id (
          ign,
          primary_role,
          kd_ratio,
          avg_damage,
          tier
        )
      `)
      .eq('recruitment_id', recruitmentId);

    if (error) throw error;
    return data;
  },

  async updateApplicationStatus(applicationId: string, status: string) {
    const { data, error } = await supabase
      .from('recruitment_applications')
      .update({ status })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
