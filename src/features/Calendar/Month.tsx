import React from 'react';
import { styled } from 'styled-components';
import Day from './Day';
import { useJobs } from '../jobs/useJobs';
import { format } from 'date-fns';

const StyledMonth = styled.div`
  display: grid;
  flex: 1 1 0%;
  gap: 0.2rem;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

type MonthProps = {
  month: Date[][];
};

const Month = ({ month }: MonthProps) => {
  const { jobs } = useJobs();
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
