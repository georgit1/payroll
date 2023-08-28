// Components
import CalendarHeader from '../features/Calendar/CalendarHeader';
import CalendarLayout from '../features/Calendar/CalendarLayout';
import Row from '../ui/Row';

const Calendar = () => {
  return (
    <>
      <Row type='horizontal'>
        <CalendarHeader />
      </Row>

      <CalendarLayout />
    </>
  );
};

export default Calendar;
