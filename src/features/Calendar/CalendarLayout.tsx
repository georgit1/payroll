import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

// Components
import Month from './Month';
import Sidebar from './CalendarSidebar';

// Hooks
import { useCalendar } from '../../context/CalenderContext';
import { useJobs } from '../jobs/useJobs';
import { useWages } from '../settings/useWages';

// Helpers
import { getMonth } from '../../utils/helpers';

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  column-gap: 0.4rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useCalendar();
  const { jobs } = useJobs();
  const { wages } = useWages();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <StyledCalendar>
      {wages && <Sidebar wages={wages} />}
      {jobs && wages && (
        <Month month={currentMonth} jobs={jobs} wages={wages} />
      )}
    </StyledCalendar>
  );
};

export default CalendarLayout;
