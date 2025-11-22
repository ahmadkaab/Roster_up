import { supabase } from './supabase';

export interface PlayerCardData {
  id?: string;
  player_id: string;
  ign: string;
  primary_game_id?: string; // UUID
  primary_role: string;
  kd_ratio?: number;
  avg_damage?: number;
  device_model?: string;
  availability?: string;
}

export const PlayerService = {
  async getPlayerCard(userId: string) {
    const { data, error } = await supabase
      .from('player_cards')
      .select('*, games(name)')
      .eq('player_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows found"
    return data;
  },

  async createOrUpdatePlayerCard(cardData: PlayerCardData) {
    const { data, error } = await supabase
      .from('player_cards')
      .upsert(cardData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*');
    
    if (error) throw error;
    return data;
  },
};
