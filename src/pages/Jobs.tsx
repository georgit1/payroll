// Components
import Row from '../ui/Row';
import AddJob from '../features/jobs/AddJob';
import Heading from '../ui/Heading';
import JobTable from '../features/jobs/JobTable';
import TableLegend from '../ui/TableLegend';
import JobsTableOperations from '../features/jobs/JobsTableOperations';

// Hooks
import { useJobs } from '../features/jobs/useJobs';

// Helpers
import { legendColors } from '../utils/helpers';

const JobsOverview = () => {
  const { jobs } = useJobs();

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Jobs Overview</Heading>
        <JobsTableOperations />
      </Row>

      <Row>
        <JobTable />
        {jobs && jobs?.length > 0 && <TableLegend colors={legendColors} />}
        <AddJob />
      </Row>
    </>
  );
};

export default JobsOverview;
