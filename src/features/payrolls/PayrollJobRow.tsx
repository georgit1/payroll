import { JobType } from '../../types/collection';
import Table from '../../ui/Table';
import { formatDate, removeTrailingZeros } from '../../utils/helpers';
import { CSSProperties } from 'react';
import { styled } from 'styled-components';

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const PayrollJobRow = ({ job }: { job: JobType }) => {
  const {
    id: jobId,
    date,
    project,
    location,
    dresscode,
    check_in: checkIn,
    check_out: checkOut,
    total_hours: totalTime,
    night_hours: nightHours,
    is_holiday: isHoliday,
  } = job;

  const isSuit = dresscode === 'suit';

  const style: CSSProperties = {
    ...(isSuit
      ? {
          backgroundColor: 'var(--color-blue-100)',
          borderLeft: '3px solid var(--color-blue-700)',
        }
      : {}),
    ...(isHoliday ? { fontWeight: 'bold', color: 'var(--color-red-700)' } : {}),
  };

  return (
    <Table.Row style={style}>
      <div>{formatDate(date)}</div>
      <Stacked>
        <span>{project}</span>
        <span>{location}</span>
      </Stacked>
      <Stacked>
        <span>{checkIn}</span>
        <span>{checkOut}</span>
      </Stacked>
      <Stacked>
        <span>{removeTrailingZeros(totalTime)}</span>
        <span>{removeTrailingZeros(nightHours)}</span>
      </Stacked>
    </Table.Row>
  );
};

export default PayrollJobRow;
