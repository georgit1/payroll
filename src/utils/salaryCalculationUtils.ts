import {
  Combination,
  ExtractWageData,
  FullWageData,
  Job,
  SalaryOptions,
  SalaryOptions as SalaryOptionsType,
  Wage,
} from '../types';

import {
  capitalizeFirstLetter,
  getHoursByDresscodeAndRole,
  toCamelCase,
  toPascalCase,
} from './helpers';

// initialze total hours for all combinations
export const initializeSalaryOptions = (): SalaryOptionsType => {
  const keys: (keyof SalaryOptionsType)[] = [
    'totalHoursVestJun',
    'totalHoursVestJunHoliday',
    'totalHoursVestSen',
    'totalHoursVestSenHoliday',
    'totalHoursSuitJun',
    'totalHoursSuitJunHoliday',
    'totalHoursSuitSen',
    'totalHoursSuitSenHoliday',
    'totalNightHoursVestJun',
    'totalNightHoursVestJunHoliday',
    'totalNightHoursVestSen',
    'totalNightHoursVestSenHoliday',
    'totalNightHoursSuitJun',
    'totalNightHoursSuitJunHoliday',
    'totalNightHoursSuitSen',
    'totalNightHoursSuitSenHoliday',
  ];

  return keys.reduce((options, key) => {
    options[key] = 0;
    return options;
  }, {} as SalaryOptionsType);
};

// make a list of totalHours and nightHours for all combinations
export const calculateSalaryOptions = (
  combinations: Combination[],
  monthData: Job[]
): SalaryOptionsType => {
  const salaryOptions: SalaryOptionsType = initializeSalaryOptions();

  combinations.forEach(({ dresscode, role, timeType }) => {
    let key: string | undefined;

    if (timeType.startsWith('total')) {
      const result = toCamelCase(timeType);

      key = `${result}${capitalizeFirstLetter(
        dresscode
      )}${capitalizeFirstLetter(role)}`;
    }

    if (timeType.startsWith('night')) {
      const result = toPascalCase(timeType);
      key = `total${result}${capitalizeFirstLetter(
        dresscode
      )}${capitalizeFirstLetter(role)}`;
    }

    if (key) {
      const holidayKey = `${key}Holiday`;
      salaryOptions[key] = Number(
        monthData
          ? getHoursByDresscodeAndRole(monthData, dresscode, role, timeType)
          : 0
      );

      salaryOptions[holidayKey] = Number(
        monthData
          ? getHoursByDresscodeAndRole(
              monthData,
              dresscode,
              role,
              timeType,
              true
            )
          : 0
      );
    }
  });

  return salaryOptions;
};

// extract wage data based on role, dresscode and holiday
export const extractWageData = <T extends boolean>(
  data: Wage,
  salaryOptions: SalaryOptions,
  role: string,
  dresscode: string,
  isHoliday: T = false as T
): ExtractWageData<T> => {
  const wage: FullWageData & { [index: string]: number } = calculateSalary(
    salaryOptions,
    data
  );
  const holiday = isHoliday ? 'Holiday' : '';

  const dresscodeCaps = capitalizeFirstLetter(dresscode);
  const roleCaps = capitalizeFirstLetter(role);

  const dayHours = wage[`dayHours${dresscodeCaps}${roleCaps}${holiday}`]!;
  const hourlyRateDay =
    wage[`hourlyRate${dresscodeCaps}${roleCaps}${holiday}`]!;
  const amountDay = wage[`amount${dresscodeCaps}Day${roleCaps}${holiday}`]!;

  const nightHours =
    salaryOptions[`totalNightHours${dresscodeCaps}${roleCaps}${holiday}`]!;

  const hourlyRateNight =
    wage[`hourlyRate${dresscodeCaps}${roleCaps}Night${holiday}`]!;

  const amountNight = wage[`amount${dresscodeCaps}Night${roleCaps}${holiday}`]!;

  const holidayCompensationRateDay =
    wage[`holidayCompensationRate${dresscodeCaps}${roleCaps}${holiday}`]!;

  const amountHolidayCompensationDay =
    wage[`amountHolidayCompensationDay${dresscodeCaps}${roleCaps}${holiday}`]!;

  const holidayCompensationRateNight =
    wage[`holidayCompensationRate${dresscodeCaps}${roleCaps}Night${holiday}`]!;
  const amountHolidayCompensationNight =
    wage[
      `amountHolidayCompensationNight${dresscodeCaps}${roleCaps}${holiday}`
    ]!;

  const totalHours =
    salaryOptions[`totalHours${dresscodeCaps}${roleCaps}${holiday}`]!;

  // only for holiday days
  const amountHolidaySurchargeTotalHours =
    wage[`amount${dresscodeCaps}${roleCaps}HolidaySurchargeTotalHours`];
  const amountHolidaySurchargeNightHours =
    wage[`amount${dresscodeCaps}${roleCaps}HolidaySurchargeNightHours`];

  return {
    nightAllowanceRate: data.night_allowance_rate,
    role,
    dresscode,
    dayHours,
    nightHours,
    totalHours,
    hourlyRateDay,
    amountDay,
    hourlyRateNight,
    amountNight,
    holidayCompensationRateDay,
    amountHolidayCompensationDay,
    holidayCompensationRateNight,
    amountHolidayCompensationNight,
    ...(isHoliday
      ? {
          amountHolidaySurchargeTotalHours,
          amountHolidaySurchargeNightHours,
        }
      : {}),
  } as ExtractWageData<T>;
};

// calculate all values which are neccessary for total salary (for all combinations)
export const calculateSalary = (
  salaryOptions: SalaryOptions,
  currentWage: Wage
): FullWageData => {
  const {
    totalHoursVestJun,
    totalHoursVestJunHoliday,

    totalHoursVestSen,
    totalHoursVestSenHoliday,

    totalHoursSuitJun,
    totalHoursSuitJunHoliday,

    totalHoursSuitSen,
    totalHoursSuitSenHoliday,

    totalNightHoursVestJun,
    totalNightHoursVestJunHoliday,

    totalNightHoursVestSen,
    totalNightHoursVestSenHoliday,

    totalNightHoursSuitJun,
    totalNightHoursSuitJunHoliday,

    totalNightHoursSuitSen,
    totalNightHoursSuitSenHoliday,
  } = salaryOptions;

  const {
    base_wage: baseWage,
    holiday_compensation: holidayCompansation,
    night_allowance_rate: nightAllowanceRate,
    overpayment_jun_vest: overpaymentJunVest,
    overpayment_jun_vest_night: overpaymentJunVestNight,
    overpayment_jun_vest_holiday: overpaymentJunVestHoliday,
    overpayment_jun_vest_night_holiday: overpaymentJunVestNightHoliday,
    overpayment_jun_suit: overpaymentJunSuit,
    overpayment_jun_suit_night: overpaymentJunSuitNight,
    overpayment_jun_suit_holiday: overpaymentJunSuitHoliday,
    overpayment_jun_suit_night_holiday: overpaymentJunSuitNightHoliday,
    overpayment_sen_vest: overpaymentSenVest,
    overpayment_sen_vest_night: overpaymentSenVestNight,
    overpayment_sen_vest_holiday: overpaymentSenVestHoliday,
    overpayment_sen_vest_night_holiday: overpaymentSenVestNightHoliday,
    overpayment_sen_suit: overpaymentSenSuit,
    overpayment_sen_suit_night: overpaymentSenSuitNight,
    overpayment_sen_suit_holiday: overpaymentSenSuitHoliday,
    overpayment_sen_suit_night_holiday: overpaymentSenSuitNightHoliday,
  } = currentWage;

  const hourlyRateVestJun = baseWage + overpaymentJunVest;
  const hourlyRateVestJunNight = baseWage + overpaymentJunVestNight;
  const hourlyRateVestJunHoliday = baseWage + overpaymentJunVestHoliday;
  const hourlyRateVestJunNightHoliday =
    baseWage + overpaymentJunVestNightHoliday;

  const hourlyRateVestSen = baseWage + overpaymentSenVest;
  const hourlyRateVestSenNight = baseWage + overpaymentSenVestNight;
  const hourlyRateVestSenHoliday = baseWage + overpaymentSenVestHoliday;
  const hourlyRateVestSenNightHoliday =
    baseWage + overpaymentSenVestNightHoliday;

  const hourlyRateSuitJun = baseWage + overpaymentJunSuit;
  const hourlyRateSuitJunNight = baseWage + overpaymentJunSuitNight;
  const hourlyRateSuitJunHoliday = baseWage + overpaymentJunSuitHoliday;
  const hourlyRateSuitJunNightHoliday =
    baseWage + overpaymentJunSuitNightHoliday;

  const hourlyRateSuitSen = baseWage + overpaymentSenSuit;
  const hourlyRateSuitSenNight = baseWage + overpaymentSenSuitNight;
  const hourlyRateSuitSenHoliday = baseWage + overpaymentSenSuitHoliday;
  const hourlyRateSuitSenNightHoliday =
    baseWage + overpaymentSenSuitNightHoliday;

  // calculation day hours ////////////////////////////////////////
  const dayHoursVestJun = totalHoursVestJun - totalNightHoursVestJun;
  const dayHoursVestJunHoliday =
    totalHoursVestJunHoliday - totalNightHoursVestJunHoliday;

  const dayHoursVestSen = totalHoursVestSen - totalNightHoursVestSen;
  const dayHoursVestSenHoliday =
    totalHoursVestSenHoliday - totalNightHoursVestSenHoliday;

  const dayHoursSuitJun = totalHoursSuitJun - totalNightHoursSuitJun;
  const dayHoursSuitJunHoliday =
    totalHoursSuitJunHoliday - totalNightHoursSuitJunHoliday;

  const dayHoursSuitSen = totalHoursSuitSen - totalNightHoursSuitSen;
  const dayHoursSuitSenHoliday =
    totalHoursSuitSenHoliday - totalNightHoursSuitSenHoliday;

  // calculation total hours ////////////////////////////////////////
  const totalHoursNightJun = totalNightHoursVestJun + totalNightHoursSuitJun;
  const totalHoursNightJunHoliday =
    totalNightHoursVestJunHoliday + totalNightHoursSuitJunHoliday;

  const totalHoursNightSen = totalNightHoursVestSen + totalNightHoursSuitSen;
  const totalHoursNightSenHoliday =
    totalNightHoursVestSenHoliday + totalNightHoursSuitSenHoliday;

  const totalHoursNight =
    totalHoursNightJun +
    totalHoursNightSen +
    totalHoursNightJunHoliday +
    totalHoursNightSenHoliday;

  // calculate parts of salary ////////////////////////////////////////
  const amountVestDayJun = dayHoursVestJun * hourlyRateVestJun;
  const amountVestDaySen = dayHoursVestSen * hourlyRateVestSen;
  const amountVestNightJun = totalNightHoursVestJun * hourlyRateVestJunNight;
  const amountVestNightSen = totalNightHoursVestSen * hourlyRateVestSenNight;
  const amountSuitDayJun = dayHoursSuitJun * hourlyRateSuitJun;
  const amountSuitDaySen = dayHoursSuitSen * hourlyRateSuitSen;
  const amountSuitNightJun = totalNightHoursSuitJun * hourlyRateSuitJunNight;
  const amountSuitNightSen = totalNightHoursSuitSen * hourlyRateSuitSenNight;

  const amountNightAllowance = totalHoursNight * nightAllowanceRate;

  // holiday compensation ///////////////////////////////////////////////
  const holidayCompansationRate = holidayCompansation / 100;

  // 1) day
  const holidayCompensationRateVestJun =
    hourlyRateVestJun * holidayCompansationRate;
  const holidayCompensationRateVestSen =
    hourlyRateVestSen * holidayCompansationRate;
  const holidayCompensationRateSuitJun =
    hourlyRateSuitJun * holidayCompansationRate;
  const holidayCompensationRateSuitSen =
    hourlyRateSuitSen * holidayCompansationRate;

  // 2) night
  const holidayCompensationRateVestJunNight =
    hourlyRateVestJunNight * holidayCompansationRate;
  const holidayCompensationRateVestSenNight =
    hourlyRateVestSenNight * holidayCompansationRate;
  const holidayCompensationRateSuitJunNight =
    hourlyRateSuitJunNight * holidayCompansationRate;
  const holidayCompensationRateSuitSenNight =
    hourlyRateSuitSenNight * holidayCompansationRate;

  //  holiday compensation - day
  const amountHolidayCompensationDayVestJun =
    dayHoursVestJun * holidayCompensationRateVestJun;

  const amountHolidayCompensationDayVestSen =
    dayHoursVestSen * holidayCompensationRateVestSen;
  const amountHolidayCompensationDaySuitJun =
    dayHoursSuitJun * holidayCompensationRateSuitJun;
  const amountHolidayCompensationDaySuitSen =
    dayHoursSuitSen * holidayCompensationRateSuitSen;

  const amountHolidayCompensationDay =
    amountHolidayCompensationDayVestJun +
    amountHolidayCompensationDayVestSen +
    amountHolidayCompensationDaySuitJun +
    amountHolidayCompensationDaySuitSen;

  //  holiday compensation - night
  const amountHolidayCompensationNightVestJun =
    totalNightHoursVestJun * holidayCompensationRateVestJunNight;
  const amountHolidayCompensationNightVestSen =
    totalNightHoursVestSen * holidayCompensationRateVestSenNight;
  const amountHolidayCompensationNightSuitJun =
    totalNightHoursSuitJun * holidayCompensationRateSuitJunNight;
  const amountHolidayCompensationNightSuitSen =
    totalNightHoursSuitSen * holidayCompensationRateSuitSenNight;

  const amountHolidayCompensationNight =
    amountHolidayCompensationNightVestJun +
    amountHolidayCompensationNightVestSen +
    amountHolidayCompensationNightSuitJun +
    amountHolidayCompensationNightSuitSen;

  const amountHolidayCompensation =
    amountHolidayCompensationDay + amountHolidayCompensationNight;

  //  calculate holiday salaries /////////////////////////////////////////////
  const amountVestDayJunHoliday =
    dayHoursVestJunHoliday * hourlyRateVestJunHoliday;
  const amountVestNightJunHoliday =
    totalNightHoursVestJunHoliday * hourlyRateVestJunNightHoliday;
  const amountVestDaySenHoliday =
    dayHoursVestSenHoliday * hourlyRateVestSenHoliday;
  const amountVestNightSenHoliday =
    totalNightHoursVestSenHoliday * hourlyRateVestSenNightHoliday;
  const amountSuitDayJunHoliday =
    dayHoursSuitJunHoliday * hourlyRateSuitJunHoliday;
  const amountSuitNightJunHoliday =
    totalNightHoursSuitJunHoliday * hourlyRateSuitJunNightHoliday;
  const amountSuitDaySenHoliday =
    dayHoursSuitSenHoliday * hourlyRateSuitSenHoliday;
  const amountSuitNightSenHoliday =
    totalNightHoursSuitSenHoliday * hourlyRateSuitSenNightHoliday;

  // calculate holiday surcharge ///////////////////////////////////////77////
  const amountVestJunHolidaySurchargeTotalHours =
    totalHoursVestJunHoliday * hourlyRateVestJunHoliday;
  const amountVestJunHolidaySurchargeNightHours =
    totalNightHoursVestJunHoliday * nightAllowanceRate;
  const amountVestJunHolidaySurcharge =
    amountVestJunHolidaySurchargeTotalHours +
    amountVestJunHolidaySurchargeNightHours;

  const amountVestSenHolidaySurchargeTotalHours =
    totalHoursVestSenHoliday * hourlyRateVestSenHoliday;
  const amountVestSenHolidaySurchargeNightHours =
    totalNightHoursVestSenHoliday * nightAllowanceRate;
  const amountVestSenHolidaySurcharge =
    amountVestSenHolidaySurchargeTotalHours +
    amountVestSenHolidaySurchargeNightHours;

  const amountSuitJunHolidaySurchargeTotalHours =
    totalHoursSuitJunHoliday * hourlyRateSuitJunHoliday;
  const amountSuitJunHolidaySurchargeNightHours =
    totalNightHoursSuitJunHoliday * nightAllowanceRate;
  const amountSuitJunHolidaySurcharge =
    amountSuitJunHolidaySurchargeTotalHours +
    amountSuitJunHolidaySurchargeNightHours;

  const amountSuitSenHolidaySurchargeTotalHours =
    totalHoursSuitSenHoliday * hourlyRateSuitSenHoliday;
  const amountSuitSenHolidaySurchargeNightHours =
    totalNightHoursSuitSenHoliday * nightAllowanceRate;
  const amountSuitSenHolidaySurcharge =
    amountSuitSenHolidaySurchargeTotalHours +
    amountSuitSenHolidaySurchargeNightHours;

  // holiday compensation holiday ///////////////////////////////////////////////

  // 1) day
  const holidayCompensationRateVestJunHoliday =
    hourlyRateVestJunHoliday * holidayCompansationRate;
  const holidayCompensationRateVestSenHoliday =
    hourlyRateVestSenHoliday * holidayCompansationRate;
  const holidayCompensationRateSuitJunHoliday =
    hourlyRateSuitJunHoliday * holidayCompansationRate;
  const holidayCompensationRateSuitSenHoliday =
    hourlyRateSuitSenHoliday * holidayCompansationRate;

  // 2) night
  const holidayCompensationRateVestJunNightHoliday =
    hourlyRateVestJunNightHoliday * holidayCompansationRate;
  const holidayCompensationRateVestSenNightHoliday =
    hourlyRateVestSenNightHoliday * holidayCompansationRate;
  const holidayCompensationRateSuitJunNightHoliday =
    hourlyRateSuitJunNightHoliday * holidayCompansationRate;
  const holidayCompensationRateSuitSenNightHoliday =
    hourlyRateSuitSenNightHoliday * holidayCompansationRate;

  //  holiday compensation on holidays - day
  const amountHolidayCompensationDayVestJunHoliday =
    dayHoursVestJunHoliday * holidayCompensationRateVestJunHoliday;
  const amountHolidayCompensationDayVestSenHoliday =
    dayHoursVestSenHoliday * holidayCompensationRateVestSenHoliday;
  const amountHolidayCompensationDaySuitJunHoliday =
    dayHoursSuitJunHoliday * holidayCompensationRateSuitJunHoliday;
  const amountHolidayCompensationDaySuitSenHoliday =
    dayHoursSuitSenHoliday * holidayCompensationRateSuitSenHoliday;

  const amountHolidayCompensationDayHoliday =
    amountHolidayCompensationDayVestJunHoliday +
    amountHolidayCompensationDayVestSenHoliday +
    amountHolidayCompensationDaySuitJunHoliday +
    amountHolidayCompensationDaySuitSenHoliday;

  //  holiday compensation on holidays - night
  const amountHolidayCompensationNightVestJunHoliday =
    totalNightHoursVestJunHoliday * holidayCompensationRateVestJunNightHoliday;
  const amountHolidayCompensationNightVestSenHoliday =
    totalNightHoursVestSenHoliday * holidayCompensationRateVestSenNightHoliday;
  const amountHolidayCompensationNightSuitJunHoliday =
    totalNightHoursSuitJunHoliday * holidayCompensationRateSuitJunNightHoliday;
  const amountHolidayCompensationNightSuitSenHoliday =
    totalNightHoursSuitSenHoliday * holidayCompensationRateSuitSenNightHoliday;

  const amountHolidayCompensationNightHoliday =
    amountHolidayCompensationNightVestJunHoliday +
    amountHolidayCompensationNightVestSenHoliday +
    amountHolidayCompensationNightSuitJunHoliday +
    amountHolidayCompensationNightSuitSenHoliday;

  const amountHolidayCompensationHoliday =
    amountHolidayCompensationDayHoliday + amountHolidayCompensationNightHoliday;

  // calculation total salary //////////////////////////////////////////////
  const salary =
    amountVestDayJun +
    amountVestDaySen +
    amountVestNightJun +
    amountVestNightSen +
    amountSuitDayJun +
    amountSuitDaySen +
    amountSuitNightJun +
    amountSuitNightSen +
    amountVestDayJunHoliday +
    amountVestDaySenHoliday +
    amountVestNightJunHoliday +
    amountVestNightSenHoliday +
    amountSuitDayJunHoliday +
    amountSuitDaySenHoliday +
    amountSuitNightJunHoliday +
    amountSuitNightSenHoliday +
    amountVestJunHolidaySurcharge +
    amountVestSenHolidaySurcharge +
    amountSuitJunHolidaySurcharge +
    amountSuitSenHolidaySurcharge +
    amountNightAllowance +
    amountHolidayCompensation +
    amountHolidayCompensationHoliday;

  return {
    // total salary
    salary,

    // day hours
    dayHoursVestJun,
    dayHoursVestSen,
    dayHoursSuitJun,
    dayHoursSuitSen,
    dayHoursVestJunHoliday,
    dayHoursVestSenHoliday,
    dayHoursSuitJunHoliday,
    dayHoursSuitSenHoliday,

    // hourly rates
    hourlyRateVestJun,
    hourlyRateVestSen,
    hourlyRateSuitJun,
    hourlyRateSuitSen,
    hourlyRateVestJunNight,
    hourlyRateVestSenNight,
    hourlyRateSuitJunNight,
    hourlyRateSuitSenNight,
    hourlyRateVestJunHoliday,
    hourlyRateVestSenHoliday,
    hourlyRateSuitJunHoliday,
    hourlyRateSuitSenHoliday,
    hourlyRateVestJunNightHoliday,
    hourlyRateVestSenNightHoliday,
    hourlyRateSuitJunNightHoliday,
    hourlyRateSuitSenNightHoliday,

    // holiday compensation rates
    holidayCompensationRateVestJun,
    holidayCompensationRateVestJunNight,
    holidayCompensationRateVestSen,
    holidayCompensationRateVestSenNight,
    holidayCompensationRateSuitJun,
    holidayCompensationRateSuitJunNight,
    holidayCompensationRateSuitSen,
    holidayCompensationRateSuitSenNight,
    holidayCompensationRateVestJunHoliday,
    holidayCompensationRateVestJunNightHoliday,
    holidayCompensationRateVestSenHoliday,
    holidayCompensationRateVestSenNightHoliday,
    holidayCompensationRateSuitJunHoliday,
    holidayCompensationRateSuitJunNightHoliday,
    holidayCompensationRateSuitSenHoliday,
    holidayCompensationRateSuitSenNightHoliday,

    // calculated values
    amountVestDayJun,
    amountVestNightJun,
    amountVestDaySen,
    amountVestNightSen,
    amountSuitDayJun,
    amountSuitNightJun,
    amountSuitDaySen,
    amountSuitNightSen,
    amountVestDayJunHoliday,
    amountVestNightJunHoliday,
    amountVestDaySenHoliday,
    amountVestNightSenHoliday,
    amountSuitDayJunHoliday,
    amountSuitNightJunHoliday,
    amountSuitDaySenHoliday,
    amountSuitNightSenHoliday,

    // holiday surcharge
    amountVestJunHolidaySurchargeTotalHours,
    amountVestJunHolidaySurchargeNightHours,
    amountVestSenHolidaySurchargeTotalHours,
    amountVestSenHolidaySurchargeNightHours,
    amountSuitJunHolidaySurchargeTotalHours,
    amountSuitJunHolidaySurchargeNightHours,
    amountSuitSenHolidaySurchargeTotalHours,
    amountSuitSenHolidaySurchargeNightHours,

    // holiday compensation
    amountHolidayCompensationDayVestJun,
    amountHolidayCompensationDayVestSen,
    amountHolidayCompensationDaySuitJun,
    amountHolidayCompensationDaySuitSen,
    amountHolidayCompensationNightVestJun,
    amountHolidayCompensationNightVestSen,
    amountHolidayCompensationNightSuitJun,
    amountHolidayCompensationNightSuitSen,
    amountHolidayCompensationDayVestJunHoliday,
    amountHolidayCompensationDayVestSenHoliday,
    amountHolidayCompensationDaySuitJunHoliday,
    amountHolidayCompensationDaySuitSenHoliday,
    amountHolidayCompensationNightVestJunHoliday,
    amountHolidayCompensationNightVestSenHoliday,
    amountHolidayCompensationNightSuitJunHoliday,
    amountHolidayCompensationNightSuitSenHoliday,

    // night allowance
    totalHoursNight,
    amountNightAllowance,
  };
};
