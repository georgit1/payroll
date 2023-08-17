import Table from '../../ui/Table';
import { JobType } from '../../types/collection';
import PayrollJobRow from './PayrollJobRow';

type PayrollJobTableProps = {
  jobs: JobType[];
};

const PayrollJobTable = ({ jobs }: PayrollJobTableProps) => {
  return (
    <Table columns='1fr 1fr 1fr 1fr'>
      <Table.Header>
        <div>date</div>
        <div>project/location</div>
        <div>Check in/out</div>
        <div>hours</div>
      </Table.Header>

      <Table.Body
        data={jobs || []}
        render={(job: JobType) => <PayrollJobRow job={job} key={job.id} />}
      />
    </Table>
  );
};

export default PayrollJobTable;
