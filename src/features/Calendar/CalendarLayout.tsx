import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { getMonth } from '../../utils/helpers';
import Month from './Month';
import { useCalendar } from '../../context/CalenderContext';
import Sidebar from './CalendarSidebar';

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  column-gap: 0.4rem;
`;

const CalendarLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useCalendar();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <StyledCalendar>
      <Sidebar />
      <Month month={currentMonth} />
    </StyledCalendar>
  );
};

export default CalendarLayout;
