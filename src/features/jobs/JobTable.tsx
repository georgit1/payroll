// Components
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import JobRow from './JobRow';
import Pagination from '../../ui/Pagination';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';

// Hooks
import { useJobs } from './useJobs';

// Types
import { JobType } from '../../types/collection';

const JobTable = () => {
  const { isLoading, jobs, count } = useJobs(true);

  if (isLoading) return <Spinner />;
  if (!jobs?.length) return <Empty resourceName='jobs' />;

  return (
    <Menus>
      <Table columns='1fr 1.5fr 1.5fr 0.9fr 1fr 1fr 1fr 0.3fr'>
        <Table.Header>
          <div>date</div>
          <div>project</div>
          <div>location</div>
          <div>check in</div>
          <div>check out</div>
          <div>totalhours</div>
          <div>nighthours</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={jobs || []}
          render={(job: JobType) => <JobRow job={job} key={job.id} />}
        />

        <Table.Footer>
          <Pagination count={count || 1} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default JobTable;
