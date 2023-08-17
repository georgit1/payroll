import { styled } from 'styled-components';
import SmallCalendar from './SmallCalendar';
import InsertJob from './InsertJob';
import Button from '../../ui/Button';
import TableLegend from '../../ui/TableLegend';
import { calendarLegendColors } from '../../utils/helpers';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-200);
  padding: 1.25rem;
  gap: 2.5rem;
`;

const CalendarSidebar = () => {
  return (
    <StyledSidebar>
      <SmallCalendar />
      <InsertJob button={<Button size='small'>Insert Job</Button>} />
      <TableLegend colors={calendarLegendColors} />
    </StyledSidebar>
  );
};

export default CalendarSidebar;
