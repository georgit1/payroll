import styled from 'styled-components';
import Stats from './Stats';
import { useRecentJobs } from './useRecentJobs';
import Spinner from '../../ui/Spinner';
import HoursChart from './HoursChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { jobs, isLoading } = useRecentJobs();

  // if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      {jobs && <Stats jobs={jobs} />}
      {/* <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
      {jobs && <HoursChart jobs={jobs} />}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
