import { styled } from 'styled-components';
import Spinner from '../../ui/Spinner';
import { combinations, groupDataByMonth } from '../../utils/helpers';
import { useJobs } from '../jobs/useJobs';
import Payroll from './Payroll';
import Empty from '../../ui/Empty';
import { useWages } from '../settings/useWages';
import {
  calculateSalary,
  calculateSalaryOptions,
} from '../../utils/salaryCalculationUtils';

const StyledPayrollsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PayrollsLayout = () => {
  const { jobs, isLoading } = useJobs();
  const { wages } = useWages();
  const groupedJobs = jobs ? groupDataByMonth(jobs) : {};

  if (isLoading) return <Spinner />;
  if (!jobs?.length) return <Empty resourceName='payrolls' />;

  return (
    <StyledPayrollsLayout>
      {Object.keys(groupedJobs).map((key) => {
        // Render a table for each month
        const monthData = groupedJobs[key];
        const date = new Date(monthData?.[0]?.date || Date.now()); // Get the date for the first row of the month
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const currentWage = wages?.find(
          (wage) => wage.year === year.toString()
        );

        const numberJobs = monthData?.length ?? 0;

        const totalHours = monthData
          ?.reduce((acc: number, cur: { total_hours: number }) => {
            return acc + cur.total_hours;
          }, 0)
          .toFixed(2);

        // prepare object for all different totalHours like jun/sen, day/night,...
        const salaryOptions =
          monthData && calculateSalaryOptions(combinations, monthData);

        // calculate salary with data based on this year
        if (!currentWage || !salaryOptions)
          throw new Error('No wage data available');
        const { salary } = calculateSalary(salaryOptions, currentWage);

        return (
          <Payroll
            key={key}
            identifier={key}
            label={`${monthName} ${year}`}
            numJobs={numberJobs}
            hours={Number(totalHours)}
            salary={salary}
            insignificanceLimit={currentWage.insignificance_limit}
          />
        );
      })}
    </StyledPayrollsLayout>
  );
};

export default PayrollsLayout;
