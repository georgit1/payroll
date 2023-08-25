import {
  parse,
  addDays,
  getTime,
  set,
  isWithinInterval,
  startOfMonth,
  getDay,
  format,
  endOfMonth,
} from 'date-fns';
import Papa from 'papaparse';
import { Combination, HolidayData, Job } from '../types';

export const legendColors = [
  { color: 'var(--color-grey-50', label: 'vest' },
  { color: 'var(--color-blue-700)', label: 'suit' },
  { color: 'var(--color-red-700)', label: 'holiday' },
];

export const calendarLegendColors = [
  { color: 'var(--color-brand-600', label: 'vest' },
  { color: 'var(--color-blue-700)', label: 'suit' },
  { color: 'var(--color-holiday-red)', label: 'holiday' },
];

export const combinations: Combination[] = [
  { dresscode: 'vest', role: 'jun', timeType: 'total_hours' },
  { dresscode: 'vest', role: 'jun', timeType: 'night_hours' },
  { dresscode: 'vest', role: 'sen', timeType: 'total_hours' },
  { dresscode: 'vest', role: 'sen', timeType: 'night_hours' },
  { dresscode: 'suit', role: 'jun', timeType: 'total_hours' },
  { dresscode: 'suit', role: 'jun', timeType: 'night_hours' },
  { dresscode: 'suit', role: 'sen', timeType: 'total_hours' },
  { dresscode: 'suit', role: 'sen', timeType: 'night_hours' },
];

export const isDayHoliday = (
  day: Date,
  holidaysData: HolidayData | undefined
): boolean => {
  if (!holidaysData) {
    return false;
  }

  const formattedDay = format(day, 'yyyy-MM-dd');
  return holidaysData.dates.includes(formattedDay);
};

export const capitalizeFirstLetter = (input: string): string => {
  return `${input?.[0]?.toUpperCase()}${input.slice(1)}`;
};

export const toCamelCase = (input: string): string => {
  const parts = input.split('_');
  const capitalizedParts = parts.map((part, index) =>
    index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join('');
};

export const toPascalCase = (input: string): string => {
  const capitalized = input
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return capitalized;
};

export const getHoursByDresscodeAndRole = (
  data: Job[],
  dresscode: string,
  role: string,
  timeType: keyof Job,
  isHoliday: boolean = false
): string => {
  const hours = data
    .filter(
      (row) =>
        row.dresscode === dresscode &&
        row.role === role &&
        row.is_holiday === isHoliday
    )
    .reduce((acc: number, cur: Job) => {
      const propertyValue = cur[timeType];
      if (typeof propertyValue === 'number') {
        return acc + propertyValue;
      }
      return acc;
    }, 0);

  return hours.toFixed(2);
};

export const calculateHours = (
  start: string,
  end: string,
  beginningNightHours: string,
  endingNightHours: string
): { totalHours: number; nightHours: number } => {
  const format = 'HH:mm';
  const startTimeString = start;
  const endTimeString = end;
  const nightStartString = beginningNightHours;
  const nightEndString = endingNightHours;
  const currentTime = new Date();

  const startTime = getTime(
    parse(
      startTimeString.substring(0, 5),
      format,
      set(currentTime, {
        hours: Number(startTimeString.split(':')[0]),
        minutes: Number(startTimeString.split(':')[1]),
      })
    )
  );
  const endTime = getTime(
    parse(
      endTimeString.substring(0, 5),
      format,
      set(currentTime, {
        hours: Number(endTimeString.split(':')[0]),
        minutes: Number(endTimeString.split(':')[1]),
      })
    )
  );

  const nightStart = getTime(
    parse(
      nightStartString.substring(0, 5),
      format,
      set(currentTime, {
        hours: Number(nightStartString.split(':')[0]),
        minutes: Number(nightStartString.split(':')[1]),
      })
    )
  );

  const nightEnd = getTime(
    parse(
      nightEndString.substring(0, 5),
      format,
      set(currentTime, {
        hours: Number(nightEndString.split(':')[0]),
        minutes: Number(nightEndString.split(':')[1]),
      })
    )
  );

  const nightEndAdjusted =
    nightEnd < nightStart ? nightEnd + 24 * 60 * 60 * 1000 : nightEnd;
  const nightInterval = { start: nightStart, end: nightEndAdjusted };

  let totalHours = 0;
  let nightHours = 0;

  // Calculate total hours
  if (endTime >= startTime) {
    totalHours = (endTime - startTime) / (60 * 60 * 1000);
  } else {
    totalHours = (endTime + 24 * 60 * 60 * 1000 - startTime) / (60 * 60 * 1000);
  }

  // Calculate night hours
  const endTimeWithinNight = isWithinInterval(endTime, nightInterval);
  const startTimeWithinNight = isWithinInterval(startTime, nightInterval);
  const wholeTimeWithinNight =
    startTime >= nightStart && endTime <= nightEndAdjusted;

  if (startTime < nightStart && endTime < nightStart && endTime > nightEnd) {
    // whole timespan before night interval
    nightHours = 0;
  } else if (wholeTimeWithinNight) {
    nightHours = totalHours;
  } else if (endTimeWithinNight && startTimeWithinNight) {
    // Both start and end times are within the night interval
    nightHours = (endTime - startTime) / (60 * 60 * 1000);
  } else if (endTimeWithinNight) {
    // Only end time is within the night interval
    nightHours = (endTime - nightStart) / (60 * 60 * 1000);
  } else if (startTimeWithinNight) {
    // Only start time is within the night interval
    nightHours = (nightEndAdjusted - startTime) / (60 * 60 * 1000);
  } else if (startTime > endTime) {
    // The time span goes over midnight
    const endTimeNextDay = addDays(new Date(endTime), 1).getTime();
    nightHours = (endTimeNextDay - nightStart) / (60 * 60 * 1000);
  } else if (endTime < nightStart) {
    // Both times are after midnight, and the whole interval is within the night interval
    nightHours = (endTime - startTime) / (60 * 60 * 1000);
  }

  return { totalHours, nightHours };
};

type GroupedData<T> = {
  [key: string]: T[];
};

export const groupDataByMonth = (data: Job[]): GroupedData<Job> => {
  const groupedData: GroupedData<Job> = {};

  if (!data) {
    return groupedData;
  }

  // create array with objects grouped by key e.g. 2023-06
  data.forEach((row) => {
    if (row.date !== null) {
      const date = new Date(row.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const key = `${year}-${month}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }

      groupedData[key]?.push(row);
    }
  });

  return groupedData;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const removeTrailingZeros = (num: number): string => {
  const trimmedNum = num.toFixed(2).replace(/\.?0*$/, '');
  return trimmedNum;
};

// Helper function to capitalize a string
export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export type CsvData = {
  fileName: string;
  dates: string[];
};

export const extractDataFromCsv = (file: File): Promise<CsvData> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result as string;
      const parsedData = Papa.parse(csvData, { skipEmptyLines: true });
      const dates = parsedData.data.map((row: any) => {
        // Regular expression to extract day, month, and year from "dd.mm.yyyy" format
        const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        const [, day, month, year] = row[0].match(dateRegex) || [];
        if (day && month && year) {
          // Convert to "yyyy-mm-dd" format
          return `${year}-${month}-${day}`;
        } else {
          alert(
            'Invalid date format in the CSV file. Dates should be in the format "dd.mm.yyyy".'
          );
          throw new Error(
            'Invalid date format in the CSV file. Dates should be in the format "dd.mm.yyyy".'
          );
        }
      });

      const csvDataObject: CsvData = {
        fileName: file.name,
        dates: dates,
      };

      resolve(csvDataObject);
    };

    reader.onerror = () => {
      throw new Error('Failed to read the CSV file.');
    };

    reader.readAsText(file);
  });
};

export const getMonth = (month: number = new Date().getMonth()): Date[][] => {
  month = Math.floor(month);
  const year = new Date().getFullYear();
  const firstDayOfTheMonth = startOfMonth(new Date(year, month, 1));
  const lastDayOfTheMonth = endOfMonth(new Date(year, month, 1));

  const daysMatrix: Date[][] = [];
  let currentWeek: Date[] = [];

  // Handle days of the previous month in the first week
  let prevMonthDay = addDays(firstDayOfTheMonth, -1);
  while (prevMonthDay.getDay() !== 6) {
    currentWeek.unshift(prevMonthDay);
    prevMonthDay = addDays(prevMonthDay, -1);
  }

  // Populate the matrix with days of the current month
  for (
    let day = firstDayOfTheMonth;
    day <= lastDayOfTheMonth;
    day = addDays(day, 1)
  ) {
    currentWeek.push(day);

    if (getDay(day) === 6) {
      daysMatrix.push(currentWeek);
      currentWeek = [];
    }
  }

  // Handle days of the next month in the last week
  let nextMonthDay = addDays(lastDayOfTheMonth, 1);
  while (nextMonthDay.getDay() !== 0) {
    currentWeek.push(nextMonthDay);
    nextMonthDay = addDays(nextMonthDay, 1);
  }
  daysMatrix.push(currentWeek);

  return daysMatrix;
};
