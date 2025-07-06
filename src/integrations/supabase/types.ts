export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      builds: {
        Row: {
          champion_id: number | null
          created_at: string | null
          games_played: number | null
          id: number
          is_featured: boolean | null
          item_ids: number[] | null
          items: Json
          name: string
          patch_version: string
          pick_rate: number
          role: string
          rune_ids: number[] | null
          runes: Json
          skill_order: Json | null
          tier: string
          updated_at: string | null
          win_rate: number
        }
        Insert: {
          champion_id?: number | null
          created_at?: string | null
          games_played?: number | null
          id?: number
          is_featured?: boolean | null
          item_ids?: number[] | null
          items: Json
          name: string
          patch_version?: string
          pick_rate: number
          role: string
          rune_ids?: number[] | null
          runes: Json
          skill_order?: Json | null
          tier: string
          updated_at?: string | null
          win_rate: number
        }
        Update: {
          champion_id?: number | null
          created_at?: string | null
          games_played?: number | null
          id?: number
          is_featured?: boolean | null
          item_ids?: number[] | null
          items?: Json
          name?: string
          patch_version?: string
          pick_rate?: number
          role?: string
          rune_ids?: number[] | null
          runes?: Json
          skill_order?: Json | null
          tier?: string
          updated_at?: string | null
          win_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "builds_champion_id_fkey"
            columns: ["champion_id"]
            isOneToOne: false
            referencedRelation: "champions"
            referencedColumns: ["id"]
          },
        ]
      }
      champions: {
        Row: {
          ban_rate: number
          champion_key: string
          created_at: string | null
          id: number
          image_url: string | null
          name: string
          patch_version: string
          pick_rate: number
          role: string
          splash_art_url: string | null
          tier: string
          trend: string
          updated_at: string | null
          win_rate: number
        }
        Insert: {
          ban_rate: number
          champion_key: string
          created_at?: string | null
          id?: number
          image_url?: string | null
          name: string
          patch_version?: string
          pick_rate: number
          role: string
          splash_art_url?: string | null
          tier: string
          trend: string
          updated_at?: string | null
          win_rate: number
        }
        Update: {
          ban_rate?: number
          champion_key?: string
          created_at?: string | null
          id?: number
          image_url?: string | null
          name?: string
          patch_version?: string
          pick_rate?: number
          role?: string
          splash_art_url?: string | null
          tier?: string
          trend?: string
          updated_at?: string | null
          win_rate?: number
        }
        Relationships: []
      }
      items: {
        Row: {
          build_path: Json | null
          cost: number | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          item_key: string
          name: string
          stats: Json | null
          updated_at: string | null
        }
        Insert: {
          build_path?: Json | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          item_key: string
          name: string
          stats?: Json | null
          updated_at?: string | null
        }
        Update: {
          build_path?: Json | null
          cost?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          item_key?: string
          name?: string
          stats?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      matchups: {
        Row: {
          champion_id: number | null
          created_at: string | null
          difficulty: string
          id: number
          opponent_champion_id: number | null
          patch_version: string
          tips: string | null
          win_rate: number
        }
        Insert: {
          champion_id?: number | null
          created_at?: string | null
          difficulty: string
          id?: number
          opponent_champion_id?: number | null
          patch_version?: string
          tips?: string | null
          win_rate: number
        }
        Update: {
          champion_id?: number | null
          created_at?: string | null
          difficulty?: string
          id?: number
          opponent_champion_id?: number | null
          patch_version?: string
          tips?: string | null
          win_rate?: number
        }
        Relationships: [
          {
            foreignKeyName: "matchups_champion_id_fkey"
            columns: ["champion_id"]
            isOneToOne: false
            referencedRelation: "champions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matchups_opponent_champion_id_fkey"
            columns: ["opponent_champion_id"]
            isOneToOne: false
            referencedRelation: "champions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          preferred_role: string | null
          rank_tier: string | null
          summoner_name: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          preferred_role?: string | null
          rank_tier?: string | null
          summoner_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preferred_role?: string | null
          rank_tier?: string | null
          summoner_name?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      runes: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          rune_key: string
          tier: number
          tree: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          rune_key: string
          tier: number
          tree: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          rune_key?: string
          tier?: number
          tree?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_favorite_builds: {
        Row: {
          build_id: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          build_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          build_id?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_favorite_builds_build_id_fkey"
            columns: ["build_id"]
            isOneToOne: false
            referencedRelation: "builds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_favorite_builds_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          auto_update_builds: boolean | null
          created_at: string | null
          id: string
          notifications_enabled: boolean | null
          overlay_enabled: boolean | null
          preferred_language: string | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          auto_update_builds?: boolean | null
          created_at?: string | null
          id: string
          notifications_enabled?: boolean | null
          overlay_enabled?: boolean | null
          preferred_language?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_update_builds?: boolean | null
          created_at?: string | null
          id?: string
          notifications_enabled?: boolean | null
          overlay_enabled?: boolean | null
          preferred_language?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
