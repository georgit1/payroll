import { Database } from './schema';

export type JobType = Database['public']['Tables']['jobs']['Row'];
export type SettingsType = Database['public']['Tables']['settings']['Row'];
export type WageType = Database['public']['Tables']['wage']['Row'];
