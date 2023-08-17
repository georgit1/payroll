import Table from '../../ui/Table';
import { JobType } from '../../types/collection';
import PayrollJobRow from './PayrollJobRow';
import { styled } from 'styled-components';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  /* background-color: var(--color-blue-100); */

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

type PayrollJobTableProps = {
  jobs: JobType[];
};

const PayrollCalculationTable = ({ jobs }: PayrollJobTableProps) => {
  console.log(jobs);
  return (
    <StyledTable role='table'>
      <StyledHeader role='row' as='header'>
        <div>designation</div>
        <div>quantity(h)</div>
        <div>rate</div>
        <div>amount(€)</div>
      </StyledHeader>
      <StyledBody>
        <StyledRow role='row'>
          <div>dsf</div>
          <div>dsf</div>
          <div>dsf</div>
          <div>dsf</div>
        </StyledRow>
        <StyledRow>hsll</StyledRow>
        <StyledRow>hsll</StyledRow>
        <StyledRow>hsll</StyledRow>
      </StyledBody>
    </StyledTable>
    // <Table columns='1fr 1fr 1fr 1fr'>
    //   <Table.Header>
    //     <div>fee</div>
    //     <div>quantity(h)</div>
    //     <div>rate</div>
    //     <div>amount(€)</div>
    //   </Table.Header>

    //   <Table.Body
    //     data={jobs || []}
    //     render={(job: JobType) => <PayrollJobRow job={job} key={job.id} />}
    //   />
    // </Table>
  );
};

export default PayrollCalculationTable;
