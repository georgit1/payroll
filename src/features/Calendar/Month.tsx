import React from 'react';
import { styled } from 'styled-components';
import Day from './Day';
import { format } from 'date-fns';
import { JobType, WageType } from '../../types/collection';

const StyledMonth = styled.div`
  display: grid;
  flex: 1 1 0%;
  gap: 0.2rem;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

type MonthProps = {
  month: Date[][];
  jobs: JobType[];
  wages: WageType[];
};

const Month = ({ month, jobs, wages }: MonthProps) => {
  return (
    <StyledMonth>
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            const formattedDay = format(day, 'yyyy-MM-dd');
            const dayJob = jobs?.filter((job) => job.date === formattedDay);
            return (
              <Day
                day={day}
                key={idx}
                rowIdx={i}
                wages={wages}
                job={dayJob?.length ? dayJob[0] : undefined}
              />
            );
          })}
        </React.Fragment>
      ))}
    </StyledMonth>
  );
};

export default Month;
