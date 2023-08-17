import { Settings } from '../types';

export const defaultSettings: Settings = {
  beginning_night_hours: '22:00',
  ending_night_hours: '05:00',
  holiday_compensation: 1.09,
  holidays: {
    dates: [],
    fileName: '',
  },
  insignificance_limit: 500.91,
  night_allowance: 0.43,
  role: 'jun',
  vest_jun: 11.41,
  vest_jun_night: 11.02,
  vest_sen: 11.86,
  vest_sen_night: 11.47,
  suit_jun: 11.86,
  suit_jun_night: 11.47,
  suit_sen: 12.32,
  suit_sen_night: 11.93,
};
