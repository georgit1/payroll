import Table from '../../ui/Table';
import { JobType } from '../../types/collection';
import PayrollJobRow from './PayrollJobRow';

type PayrollJobTableProps = {
  jobs: JobType[];
};

const PayrollJobTable = ({ jobs }: PayrollJobTableProps) => {
  return (
    <Table columns='0.45fr .25fr 0.8fr .3fr'>
      <Table.Header>
        <div>date</div>
        <div>role</div>
        <div>project/location</div>
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
