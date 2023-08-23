import { format, startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { getMonth, isDayHoliday } from '../../utils/helpers';
import { styled } from 'styled-components';
import { useCalendar } from '../../context/CalenderContext';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useJobs } from '../jobs/useJobs';
import { HolidayData, Job } from '../../types';
import { WageType } from '../../types/collection';

const CalendarContainer = styled.div`
  margin-top: 1.5rem;
`;

const CalendarHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const MonthText = styled.p`
  color: var(--color-grey-600);
  font-size: 1.5rem;
  font-weight: bolder;
`;

const IconButton = styled.span`
  cursor: pointer;
  color: var(--color-grey-500);
  margin: 0 0.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  margin-top: 1rem;
`;

const CalendarDay = styled.span`
  font-size: 1rem;
  font-weight: bolder;
  padding: 0.25rem 0;
  text-align: center;
`;

const DayButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  padding: 0.25rem 0;
  margin-top: 0.3rem;
  width: 100%;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &.vest-day {
    background-color: var(--color-brand-600);
    color: var(--color-grey-50);
    border-radius: 9999px;
    max-width: 2.4rem;
  }

  &.vest-holiday-day {
    background-color: var(--color-brand-600);
    color: var(--color-grey-50);
    border-radius: 9999px;
    max-width: 2.4rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0.25rem solid var(--color-holiday-red);
      border-radius: inherit;
    }
  }

  &.suit-day {
    background-color: var(--color-blue-700);
    color: var(--color-grey-50);
    border-radius: 9999px;
    max-width: 2.4rem;
  }

  &.suit-holiday-day {
    background-color: var(--color-blue-700);
    color: var(--color-grey-50);
    border-radius: 9999px;
    max-width: 2.4rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0.25rem solid var(--color-holiday-red);
      border-radius: inherit;
    }
  }

  &.holiday-day {
    color: var(--color-text-holiday-red);
    background-color: var(--color-holiday-red);
    border-radius: 9999px;
    max-width: 2.4rem;
  }

  &.selected-day {
    color: var(--color-brand-600);
    font-weight: bold;
  }

  &.current-day {
    background-color: var(--color-currentDay);
    color: var(--color-text-currentDay);
    border-radius: 9999px;
    max-width: 2.4rem;
  }
`;

type SmallCalendarProps = {
  wages: WageType[];
};

const SmallCalendar = ({ wages }: SmallCalendarProps) => {
  const { jobs } = useJobs();
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useCalendar();
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    startOfMonth(new Date()).getMonth()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const findDayJob = (
    jobs: Job[] | undefined,
    formattedDay: string
  ): Job | undefined => {
    return jobs?.find((job) => job.date === formattedDay);
  };

  const getDayClass = (day: Date) => {
    const formatStr = 'dd-MM-yy';
    const nowDay = format(new Date(), formatStr);
    const currDay = format(day, formatStr);
    const selectedDay = daySelected && format(daySelected, formatStr);

    // for holdays
    const year = day.getFullYear();
    const currentWage = wages?.find((wage) => wage.year === year?.toString());
    const holidaysData = currentWage?.holidays as HolidayData;
    const isHoliday = isDayHoliday(day, holidaysData);

    const formattedDay = format(day, 'yyyy-MM-dd');
    const dayJob = findDayJob(jobs, formattedDay);
    const isVest = dayJob?.dresscode === 'vest';
    const isSuit = dayJob?.dresscode === 'suit';

    if (isVest && isHoliday) return 'vest-holiday-day';
    if (isVest) return 'vest-day';
    if (isSuit && isHoliday) return 'suit-holiday-day';
    if (isSuit) return 'suit-day';
    if (isHoliday) return 'holiday-day';
    if (nowDay === currDay) return 'current-day';
    if (currDay === selectedDay) return 'selected-day';
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <MonthText>
          {format(new Date(currentYear, currentMonthIdx), 'MMMM yyyy')}
        </MonthText>
        <div>
          <IconButton onClick={handlePrevMonth}>
            <IoIosArrowBack />
          </IconButton>
          <IconButton onClick={handleNextMonth}>
            <IoIosArrowForward />
          </IconButton>
        </div>
      </CalendarHeader>
      <GridContainer>
        {/* Render days of the week */}
        {currentMonth[0]?.map((day, i) => (
          <CalendarDay key={i}>{format(day, 'iiii')[0]}</CalendarDay>
        ))}
        {/* Render calendar days */}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <DayButton
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={getDayClass(day)}
              >
                <span className='text-sm'>{format(day, 'd')}</span>
              </DayButton>
            ))}
          </React.Fragment>
        ))}
      </GridContainer>
    </CalendarContainer>
  );
};

export default SmallCalendar;
