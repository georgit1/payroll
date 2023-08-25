import { useParams } from 'react-router-dom';
import { useMoveBack } from '../../hooks/useMoveBack';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import PayrollJobTable from './PayrollJobTable';
import { useJobsByDate } from '../jobs/useJobsByDate';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';
import { styled } from 'styled-components';
import PayrollCalculationTable from './PayrollCalculationTable';
import TableLegend from '../../ui/TableLegend';
import { legendColors } from '../../utils/helpers';
import { useWages } from '../settings/useWages';

const PayrollDetailLayout = styled.div`
  display: grid;
  grid-template-columns: 48rem auto;
  column-gap: 3rem;
`;

const PayrollDetail = () => {
  const { isLoading, jobs } = useJobsByDate();
  const { wages } = useWages();
  const { identifier } = useParams();
  const [year, month] = identifier?.split('-') ?? [];
  const moveBack = useMoveBack();

  const currentWage = wages?.find((wage) => wage.year === year);

  if (isLoading) return <Spinner />;
  if (!jobs) return <Empty resourceName='payroll' />;

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>{`Payroll - ${month?.padStart(
          2,
          '0'
        )} ${year}`}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <PayrollDetailLayout>
        <Row>
          <PayrollJobTable jobs={jobs} />
          <TableLegend colors={legendColors} />
        </Row>
        {currentWage && (
          <PayrollCalculationTable jobs={jobs} wage={currentWage} />
        )}
      </PayrollDetailLayout>
    </>
  );
};

export default PayrollDetail;
