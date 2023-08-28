import { Settings, Wage } from '../types';

export const defaultSettings: Settings = {
  role: 'jun',
};

export const defaultWage: Wage = {
  base_wage: 10.76,
  annual_wage_limit: 11000,
  year: new Date().getFullYear().toString(),
  holiday_compensation: 9.58,
  insignificance_limit: 500.91,
  night_allowance_rate: 0.43,
  beginning_night_hours: '22:00',
  ending_night_hours: '05:00',
  overpayment_jun_vest: 0.65,
  overpayment_jun_vest_night: 0.26,
  overpayment_jun_vest_holiday: 0,
  overpayment_jun_vest_night_holiday: 0,
  overpayment_jun_suit: 1.1,
  overpayment_jun_suit_night: 0.71,
  overpayment_jun_suit_holiday: 0,
  overpayment_jun_suit_night_holiday: 0,
  overpayment_sen_vest: 1.1,
  overpayment_sen_vest_night: 0.71,
  overpayment_sen_vest_holiday: 0.24,
  overpayment_sen_vest_night_holiday: 0.24,
  overpayment_sen_suit: 1.56,
  overpayment_sen_suit_night: 1.17,
  overpayment_sen_suit_holiday: 0.24,
  overpayment_sen_suit_night_holiday: 0.24,
  monthly_repayment_rate_health_insurance: 14.62,
  holidays: {
    dates: [],
    fileName: '',
  },
};
