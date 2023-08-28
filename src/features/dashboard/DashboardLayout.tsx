import styled from 'styled-components';

// Components
import Stats from './Stats';
import Spinner from '../../ui/Spinner';
import HoursChart from './HoursChart';
import NumJobsChart from './NumJobsChart';

// Hooks
import { useWages } from '../settings/useWages';
import { useRecentJobs } from './useRecentJobs';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem 34rem;
  gap: 2.4rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 34rem;
  }
`;

function DashboardLayout() {
  const { jobs, isLoading: isLoading1 } = useRecentJobs();
  const { wages, isLoading: isLoading2 } = useWages();

  if (isLoading1 || isLoading2) return <Spinner />;

  // extract the year from the first job object
  const [year] = jobs?.[0]?.date?.split('-') ?? '';

  // get the stored wage data for selected year
  const currentWage = wages?.find((wage) => wage.year === year?.toString());

  return (
    <StyledDashboardLayout>
      {jobs && currentWage && <Stats jobs={jobs} currentWage={currentWage} />}
      {jobs && <HoursChart jobs={jobs} />}
      {jobs && <NumJobsChart jobs={jobs} />}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
