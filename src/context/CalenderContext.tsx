import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getMonth } from 'date-fns';

const initialValue: {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  smallCalendarMonth: number;
  setSmallCalendarMonth: (index: number) => void;
  daySelected: Date;
  setDaySelected: (day: Date) => void;
} = {
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => {},
  daySelected: new Date(),
  setDaySelected: () => {},
};

const CalendarContext = createContext(initialValue);

const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [monthIndex, setMonthIndex] = useState(getMonth(new Date()));
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(
    new Date().getMonth()
  );
  const [daySelected, setDaySelected] = useState(new Date());

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <CalendarContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined)
    throw new Error('CalendarContext was used outside of CalendarProvider');
  return context;
};

export { CalendarProvider, useCalendar };
