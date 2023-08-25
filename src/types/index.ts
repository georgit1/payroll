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

export type WageData = {
  role: string;
  dresscode: string;
  dayHours: number;
  hourlyRateDay: number;
  amountDay: number;
  nightHours: number;
  totalHours: number;
  hourlyRateNight: number;
  amountNight: number;
  holidayCompensationRateDay: number;
  amountHolidayCompensationDay: number;
  holidayCompensationRateNight: number;
  amountHolidayCompensationNight: number;
  amountHolidaySurchargeTotalHours: number;
  amountHolidaySurchargeNightHours: number;
  nightAllowanceRate: number;
};

export type ExtractWageData<T extends boolean> = T extends true
  ? WageDataHoliday
  : WageData;

export type WageDataGeneral = Omit<
  WageData,
  'amountHolidaySurchargeTotalHours' | 'amountHolidaySurchargeNightHours'
>;

export type WageDataHoliday = WageData & {
  amountHolidaySurchargeNightHours: number;
  amountHolidaySurchargeTotalHours: number;
};

export type FullWageData = {
  // total salary
  salary: number;

  // day hours
  dayHoursVestJun: number;
  dayHoursVestSen: number;
  dayHoursSuitJun: number;
  dayHoursSuitSen: number;
  dayHoursVestJunHoliday: number;
  dayHoursVestSenHoliday: number;
  dayHoursSuitJunHoliday: number;
  dayHoursSuitSenHoliday: number;

  // hourly rates
  hourlyRateVestJun: number;
  hourlyRateVestSen: number;
  hourlyRateSuitJun: number;
  hourlyRateSuitSen: number;
  hourlyRateVestJunNight: number;
  hourlyRateVestSenNight: number;
  hourlyRateSuitJunNight: number;
  hourlyRateSuitSenNight: number;
  hourlyRateVestJunHoliday: number;
  hourlyRateVestSenHoliday: number;
  hourlyRateSuitJunHoliday: number;
  hourlyRateSuitSenHoliday: number;
  hourlyRateVestJunNightHoliday: number;
  hourlyRateVestSenNightHoliday: number;
  hourlyRateSuitJunNightHoliday: number;
  hourlyRateSuitSenNightHoliday: number;

  // holiday compensation rates
  holidayCompensationRateVestJun: number;
  holidayCompensationRateVestJunNight: number;
  holidayCompensationRateVestSen: number;
  holidayCompensationRateVestSenNight: number;
  holidayCompensationRateSuitJun: number;
  holidayCompensationRateSuitJunNight: number;
  holidayCompensationRateSuitSen: number;
  holidayCompensationRateSuitSenNight: number;
  holidayCompensationRateVestJunHoliday: number;
  holidayCompensationRateVestJunNightHoliday: number;
  holidayCompensationRateVestSenHoliday: number;
  holidayCompensationRateVestSenNightHoliday: number;
  holidayCompensationRateSuitJunHoliday: number;
  holidayCompensationRateSuitJunNightHoliday: number;
  holidayCompensationRateSuitSenHoliday: number;
  holidayCompensationRateSuitSenNightHoliday: number;

  // calculated values
  amountVestDayJun: number;
  amountVestNightJun: number;
  amountVestDaySen: number;
  amountVestNightSen: number;
  amountSuitDayJun: number;
  amountSuitNightJun: number;
  amountSuitDaySen: number;
  amountSuitNightSen: number;
  amountVestDayJunHoliday: number;
  amountVestNightJunHoliday: number;
  amountVestDaySenHoliday: number;
  amountVestNightSenHoliday: number;
  amountSuitDayJunHoliday: number;
  amountSuitNightJunHoliday: number;
  amountSuitDaySenHoliday: number;
  amountSuitNightSenHoliday: number;

  // holiday surcharge
  amountVestJunHolidaySurchargeTotalHours: number;
  amountVestJunHolidaySurchargeNightHours: number;
  amountVestSenHolidaySurchargeTotalHours: number;
  amountVestSenHolidaySurchargeNightHours: number;
  amountSuitJunHolidaySurchargeTotalHours: number;
  amountSuitJunHolidaySurchargeNightHours: number;
  amountSuitSenHolidaySurchargeTotalHours: number;
  amountSuitSenHolidaySurchargeNightHours: number;

  // holiday compensation
  amountHolidayCompensationDayVestJun: number;
  amountHolidayCompensationDayVestSen: number;
  amountHolidayCompensationDaySuitJun: number;
  amountHolidayCompensationDaySuitSen: number;
  amountHolidayCompensationNightVestJun: number;
  amountHolidayCompensationNightVestSen: number;
  amountHolidayCompensationNightSuitJun: number;
  amountHolidayCompensationNightSuitSen: number;
  amountHolidayCompensationDayVestJunHoliday: number;
  amountHolidayCompensationDayVestSenHoliday: number;
  amountHolidayCompensationDaySuitJunHoliday: number;
  amountHolidayCompensationDaySuitSenHoliday: number;
  amountHolidayCompensationNightVestJunHoliday: number;
  amountHolidayCompensationNightVestSenHoliday: number;
  amountHolidayCompensationNightSuitJunHoliday: number;
  amountHolidayCompensationNightSuitSenHoliday: number;

  // night allowance
  totalHoursNight: number;
  amountNightAllowance: number;
};
