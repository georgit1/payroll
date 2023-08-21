import { JobType, SettingsType, WageType } from './collection';

export type Job = Omit<JobType, 'created_at' | 'id'>;
export type Settings = Omit<SettingsType, 'created_at' | 'id' | 'user_id'>;
export type Wage = Omit<WageType, 'created_at' | 'id' | 'user_id'>;

export type SalaryOptions = {
  [key: string]: number;
  totalHoursVestJun: number;
  totalHoursVestJunHoliday: number;
  totalHoursVestSen: number;
  totalHoursVestSenHoliday: number;
  totalHoursSuitJun: number;
  totalHoursSuitJunHoliday: number;
  totalHoursSuitSen: number;
  totalHoursSuitSenHoliday: number;
  totalNightHoursVestJun: number;
  totalNightHoursVestJunHoliday: number;
  totalNightHoursVestSen: number;
  totalNightHoursVestSenHoliday: number;
  totalNightHoursSuitJun: number;
  totalNightHoursSuitJunHoliday: number;
  totalNightHoursSuitSen: number;
  totalNightHoursSuitSenHoliday: number;
};

type TimeType = 'total_hours' | 'night_hours';

export type Combination = {
  dresscode: string;
  role: string;
  timeType: TimeType;
};

export type SignUpProps = {
  email: string;
  password: string;
  fullName: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

type FullNameAvatarProps = {
  fullName: string;
  avatar: File | null | undefined;
  password?: never;
};

type PasswordProps = {
  password: string;
  fullName?: never;
  avatar?: never;
};

export type UpdateUserProps = FullNameAvatarProps | PasswordProps;

export type UserAttributes = {
  data?: {
    fullName?: string;
  };
  password?: string;
};

export type HolidayData = {
  fileName: string;
  dates: string[];
};
