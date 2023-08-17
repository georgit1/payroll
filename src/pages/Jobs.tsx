import JobTable from '../features/jobs/JobTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddJob from '../features/jobs/AddJob';
import JobsTableOperations from '../features/jobs/JobsTableOperations';
import TableLegend from '../ui/TableLegend';
import { legendColors } from '../utils/helpers';
import { useJobs } from '../features/jobs/useJobs';

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
