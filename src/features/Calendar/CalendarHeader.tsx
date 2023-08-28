import { format, getMonth } from 'date-fns';
import { styled } from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Components
import Button from '../../ui/Button';

// Hooks
import { useCalendar } from '../../context/CalenderContext';

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.4rem;
`;

const Title = styled.h1`
  margin-right: 1.5rem;
  font-size: 3rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-weight: bold;
`;

const IconButton = styled.span`
  display: flex;
  font-size: 2rem;
  color: var(--color-grey-600);
  margin: 0 0.25rem;
  cursor: pointer;
`;

const MonthTitle = styled.h2`
  margin-left: 1rem;
  font-size: 2rem;
  color: var(--color-grey-600);
  font-weight: bold;
`;

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useCalendar();
  const currentYear = new Date().getFullYear();

  // switch to prev month
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  // switch to next month
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  // switch to today
  const handleReset = () => {
    setMonthIndex(
      monthIndex === getMonth(new Date())
        ? monthIndex + Math.random()
        : getMonth(new Date())
    );
  };

  return (
    <Header>
      <Title>Calendar</Title>
      <Button variation='secondary' onClick={handleReset}>
        Today
      </Button>
      <IconButton onClick={handlePrevMonth}>
        <IoIosArrowBack />
      </IconButton>
      <IconButton onClick={handleNextMonth}>
        <IoIosArrowForward />
      </IconButton>
      <MonthTitle>
        {format(new Date(currentYear, monthIndex), 'MMMM yyyy')}
      </MonthTitle>
    </Header>
  );
};

export default CalendarHeader;
