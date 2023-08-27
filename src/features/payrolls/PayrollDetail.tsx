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
import { useState } from 'react';
import InfoField from '../../ui/InfoField';

const PayrollDetailLayout = styled.div`
  display: grid;
  grid-template-columns: 48rem auto;
  column-gap: 3rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const PayrollDetail = () => {
  const [salary, setSalary] = useState<number>(0);

  const { isLoading: isLoading1, jobs } = useJobsByDate();
  const { isLoading: isLoading2, wages } = useWages();
  const { identifier } = useParams();
  const [year, month] = identifier?.split('-') ?? [];
  const moveBack = useMoveBack();

  if (isLoading1 || isLoading2) return <Spinner />;
  if (!jobs) return <Empty resourceName='payroll' />;

  const throwError = (message: string) => {
    throw new Error(message);
  };

  const currentWage = wages?.find((wage) => wage.year === year);

  const insignificanceLimit =
    currentWage?.insignificance_limit ?? throwError('current wage no found');

  const monthlyRepayment =
    currentWage?.monthly_repayment_rate_health_insurance ??
    throwError('current wage not found');
  const monthlyRepaymentRate = monthlyRepayment / 100;

  const monthSalary = salary.toFixed(2);

  const percentageWage = ((salary / insignificanceLimit) * 100).toFixed(1);

  // if monthly salary exceeds insignificance limit calc repayment of total monthly salary
  const repayment =
    Number(monthSalary) > insignificanceLimit
      ? (Number(monthSalary) * monthlyRepaymentRate).toFixed(2)
      : 0;

  const color = Number(percentageWage) <= 100 ? 'green' : 'red';

  // retrieve calc salary for this month from child component
  const handleGetSalary = (salary: number) => {
    setSalary(salary);
  };

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>
          {`Payroll - ${month?.padStart(2, '0')} ${year}`}
        </Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <InfoField color={color}>
        earned <strong>{monthSalary}€</strong> of possible{' '}
        <strong>
          {insignificanceLimit}€ ({percentageWage}%)
        </strong>{' '}
        for this month / Repayment
        {`${
          Number(repayment) > 0 ? ` (${monthlyRepaymentRate * 100}%): ` : ':'
        }`}{' '}
        <strong>{repayment}€</strong>.
      </InfoField>

      <PayrollDetailLayout>
        <Row>
          <PayrollJobTable jobs={jobs} />
          <TableLegend colors={legendColors} />
        </Row>
        {currentWage && (
          <PayrollCalculationTable
            jobs={jobs}
            wage={currentWage}
            onGetSalary={handleGetSalary}
          />
        )}
      </PayrollDetailLayout>
    </>
  );
};

export default PayrollDetail;
