import { styled } from 'styled-components';
import SmallCalendar from './SmallCalendar';
import InsertJob from './InsertJob';
import Button from '../../ui/Button';
import TableLegend from '../../ui/TableLegend';
import { calendarLegendColors } from '../../utils/helpers';
import { WageType } from '../../types/collection';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  padding: 1.25rem;
  gap: 2.5rem;
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
