import { HiOutlineBanknotes } from 'react-icons/hi2';
import { AiOutlinePercentage } from 'react-icons/ai';
import { TbSum } from 'react-icons/tb';
import { GiPayMoney } from 'react-icons/gi';

// Components
import Stat from '../../ui/Stat';

// Helpers
import {
  calculateSalary,
  calculateSalaryOptions,
} from '../../utils/salaryCalculationUtils';
import { combinations, groupDataByMonth } from '../../utils/helpers';

// Types
import { Job, Wage } from '../../types';

type StatsProps = {
  jobs: Job[];
  currentWage: Wage;
};

const Stats = ({ jobs, currentWage }: StatsProps) => {
  // 1.
  const numJobs = jobs.length;

  // 2.
  // prepare object for all different totalHours like jun/sen, day/night,...
  const salaryOptions = jobs && calculateSalaryOptions(combinations, jobs);

  // calculate salary with data based on selected year
  if (!currentWage || !salaryOptions) throw new Error('No wage data available');
  const { salary } = calculateSalary(salaryOptions, currentWage);
  const annualSalary = salary.toFixed(2);

  // 3.
  const percentageAnnualLimit = (
    (Number(annualSalary) / currentWage.annual_wage_limit) *
    100
  ).toFixed(2);

  // 4.
  // sort jobs per month with appropriate key e.g. 2023-10
  const groupedJobs = jobs ? groupDataByMonth(jobs) : {};

  // create array with overpayment for each month
  const monthlyOverpayment = Object.keys(groupedJobs).map((key) => {
    // extract jobs of month per key
    const monthData = groupedJobs[key];

    // calc appropriate hours for this month
    const monthlySalaryOptions =
      monthData && calculateSalaryOptions(combinations, monthData);

    // calc total salary for this month
    if (!monthlySalaryOptions) throw new Error('Error calculating job data');

    const { salary: monthlySalary } = calculateSalary(
      monthlySalaryOptions,
      currentWage
    );

    // calc overpayment, if exceeded calculate repayment
    const overpayment =
      monthlySalary > currentWage.insignificance_limit
        ? monthlySalary *
          (currentWage.monthly_repayment_rate_health_insurance / 100)
        : 0;

    return overpayment;
  });

  // calc total overpayment of selected year
  const yearlyOverpayment = monthlyOverpayment
    ?.reduce((acc, current) => acc + current, 0)
    .toFixed(2);

  return (
    <>
      <Stat
        title='total jobs'
        color='yellow'
        icon={<TbSum />}
        value={numJobs}
      />
      <Stat
        title='annual income (€)'
        color='blue'
        icon={<HiOutlineBanknotes />}
        value={Number(annualSalary)}
      />
      <Stat
        title='% of annual limit'
        color='green'
        icon={<AiOutlinePercentage />}
        value={Number(percentageAnnualLimit)}
      />
      <Stat
        title='annual repayment (€)'
        color='indigo'
        icon={<GiPayMoney />}
        value={Number(yearlyOverpayment)}
      />
    </>
  );
};

export default Stats;
