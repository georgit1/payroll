export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      jobs: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          date: string | null
          dresscode: string
          id: number
          is_holiday: boolean
          location: string
          night_hours: number
          project: string
          role: string
          total_hours: number
          user_id: string
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          date?: string | null
          dresscode: string
          id?: number
          is_holiday?: boolean
          location: string
          night_hours: number
          project: string
          role?: string
          total_hours: number
          user_id: string
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          date?: string | null
          dresscode?: string
          id?: number
          is_holiday?: boolean
          location?: string
          night_hours?: number
          project?: string
          role?: string
          total_hours?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          created_at: string | null
          id: number
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      wage: {
        Row: {
          annual_wage_limit: number
          base_wage: number
          beginning_night_hours: string
          created_at: string
          ending_night_hours: string
          holiday_compensation: number
          holidays: Json
          id: number
          insignificance_limit: number
          monthly_repayment_rate_health_insurance: number
          night_allowance_rate: number
          overpayment_jun_suit: number
          overpayment_jun_suit_holiday: number
          overpayment_jun_suit_night: number
          overpayment_jun_suit_night_holiday: number
          overpayment_jun_vest: number
          overpayment_jun_vest_holiday: number
          overpayment_jun_vest_night: number
          overpayment_jun_vest_night_holiday: number
          overpayment_sen_suit: number
          overpayment_sen_suit_holiday: number
          overpayment_sen_suit_night: number
          overpayment_sen_suit_night_holiday: number
          overpayment_sen_vest: number
          overpayment_sen_vest_holiday: number
          overpayment_sen_vest_night: number
          overpayment_sen_vest_night_holiday: number
          user_id: string
          year: string
        }
        Insert: {
          annual_wage_limit: number
          base_wage: number
          beginning_night_hours: string
          created_at?: string
          ending_night_hours: string
          holiday_compensation: number
          holidays: Json
          id?: number
          insignificance_limit: number
          monthly_repayment_rate_health_insurance: number
          night_allowance_rate: number
          overpayment_jun_suit: number
          overpayment_jun_suit_holiday: number
          overpayment_jun_suit_night: number
          overpayment_jun_suit_night_holiday: number
          overpayment_jun_vest: number
          overpayment_jun_vest_holiday: number
          overpayment_jun_vest_night: number
          overpayment_jun_vest_night_holiday: number
          overpayment_sen_suit: number
          overpayment_sen_suit_holiday: number
          overpayment_sen_suit_night: number
          overpayment_sen_suit_night_holiday: number
          overpayment_sen_vest: number
          overpayment_sen_vest_holiday: number
          overpayment_sen_vest_night: number
          overpayment_sen_vest_night_holiday: number
          user_id: string
          year: string
        }
        Update: {
          annual_wage_limit?: number
          base_wage?: number
          beginning_night_hours?: string
          created_at?: string
          ending_night_hours?: string
          holiday_compensation?: number
          holidays?: Json
          id?: number
          insignificance_limit?: number
          monthly_repayment_rate_health_insurance?: number
          night_allowance_rate?: number
          overpayment_jun_suit?: number
          overpayment_jun_suit_holiday?: number
          overpayment_jun_suit_night?: number
          overpayment_jun_suit_night_holiday?: number
          overpayment_jun_vest?: number
          overpayment_jun_vest_holiday?: number
          overpayment_jun_vest_night?: number
          overpayment_jun_vest_night_holiday?: number
          overpayment_sen_suit?: number
          overpayment_sen_suit_holiday?: number
          overpayment_sen_suit_night?: number
          overpayment_sen_suit_night_holiday?: number
          overpayment_sen_vest?: number
          overpayment_sen_vest_holiday?: number
          overpayment_sen_vest_night?: number
          overpayment_sen_vest_night_holiday?: number
          user_id?: string
          year?: string
        }
        Relationships: [
          {
            foreignKeyName: "wage_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
