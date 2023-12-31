import { CSSProperties } from 'react';
import { styled } from 'styled-components';

// Components
import Table from '../../ui/Table';

// Helpers
import {
  capitalizeFirstLetter,
  formatDate,
  removeTrailingZeros,
} from '../../utils/helpers';

// Types
import { JobType } from '../../types/collection';

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
    role,
    date,
    project,
    location,
    dresscode,
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
  };

  const dateStyle: CSSProperties = {
    ...(isHoliday
      ? { fontWeight: 'bold', color: 'var(--color-holiday-font-red)' }
      : {}),
  };

  return (
    <Table.Row style={style}>
      <div style={dateStyle}>{formatDate(date ?? '')}</div>
      <div>{capitalizeFirstLetter(role)}</div>
      <Stacked>
        <span>{project}</span>
        <span>{location}</span>
      </Stacked>
      <Stacked>
        <span>{removeTrailingZeros(totalTime)}</span>
        <span>{removeTrailingZeros(nightHours)}</span>
      </Stacked>
    </Table.Row>
  );
};

export default PayrollJobRow;
