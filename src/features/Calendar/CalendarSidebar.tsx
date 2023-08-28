import { styled } from 'styled-components';

// Components
import SmallCalendar from './SmallCalendar';
import InsertJob from './InsertJob';
import Button from '../../ui/Button';
import TableLegend from '../../ui/TableLegend';

// Helpers
import { calendarLegendColors } from '../../utils/helpers';

// Types
import { WageType } from '../../types/collection';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  padding: 1.25rem;
  gap: 2.5rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    display: none;
  }
`;

type CalendarSidebarProps = {
  wages: WageType[];
};

const CalendarSidebar = ({ wages }: CalendarSidebarProps) => {
  return (
    <StyledSidebar>
      <SmallCalendar wages={wages} />
      <InsertJob button={<Button size='small'>Insert Job</Button>} />
      <TableLegend colors={calendarLegendColors} />
    </StyledSidebar>
  );
};

export default CalendarSidebar;
