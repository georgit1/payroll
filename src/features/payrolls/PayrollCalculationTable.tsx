import { JobType } from '../../types/collection';
import { styled } from 'styled-components';
import {
  calculateSalary,
  calculateSalaryOptions,
  extractWageData,
} from '../../utils/salaryCalculationUtils';
import { combinations } from '../../utils/helpers';
import { Wage } from '../../types';
import HolidayCalculationBlock from './HolidayCalculationBlock';
import GeneralCalculationBlock from './GeneralCalculationBlock';

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  height: fit-content;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 0.6fr 0.8fr;
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

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledResultRow = styled(CommonRow)`
  background-color: var(--color-result-row);
  padding: 1.2rem 2.4rem;
  font-weight: 700;
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

type PayrollJobTableProps = {
  jobs: JobType[];
  wage: Wage;
};

const PayrollCalculationTable = ({ jobs, wage }: PayrollJobTableProps) => {
  const { night_allowance_rate: nightAllowanceRate } = wage;

  // prepare object totalHours for all combinations like jun/sen, day/night,...
  const salaryOptions = calculateSalaryOptions(combinations, jobs);

  const {
    // total salary
    salary,

    // night allowance
    totalHoursNight,
    amountNightAllowance,
  } = calculateSalary(salaryOptions, wage);

  // general data
  const junVestData = extractWageData(wage, salaryOptions, 'jun', 'vest');
  const junSuitData = extractWageData(wage, salaryOptions, 'jun', 'suit');
  const senVestData = extractWageData(wage, salaryOptions, 'sen', 'vest');
  const senSuitData = extractWageData(wage, salaryOptions, 'sen', 'suit');

  // holiday data
  const junVestHolidayData = extractWageData(
    wage,
    salaryOptions,
    'jun',
    'vest',
    true
  );

  const junSuitHolidayData = extractWageData(
    wage,
    salaryOptions,
    'jun',
    'suit',
    true
  );
  const senVestHolidayData = extractWageData(
    wage,
    salaryOptions,
    'sen',
    'vest',
    true
  );
  const senSuitHolidayData = extractWageData(
    wage,
    salaryOptions,
    'sen',
    'suit',
    true
  );

  return (
    <StyledTable role='table'>
      <StyledHeader role='row' as='header'>
        <div>designation</div>
        <div>quantity(h)</div>
        <div>rate</div>
        <div>amount(€)</div>
      </StyledHeader>
      <StyledBody>
        {/* general */}
        {junVestData.totalHours !== 0 && (
          <GeneralCalculationBlock wageData={junVestData} />
        )}
        {junSuitData.totalHours !== 0 && (
          <GeneralCalculationBlock wageData={junSuitData} />
        )}
        {senVestData.totalHours !== 0 && (
          <GeneralCalculationBlock wageData={senVestData} />
        )}
        {senSuitData.totalHours !== 0 && (
          <GeneralCalculationBlock wageData={senSuitData} />
        )}

        {/* holiday */}
        {junVestHolidayData.totalHours !== 0 && (
          <HolidayCalculationBlock wageData={junVestHolidayData} />
        )}
        {junSuitHolidayData.totalHours !== 0 && (
          <HolidayCalculationBlock wageData={junSuitHolidayData} />
        )}
        {senVestHolidayData.totalHours !== 0 && (
          <HolidayCalculationBlock wageData={senVestHolidayData} />
        )}
        {senSuitHolidayData.totalHours !== 0 && (
          <HolidayCalculationBlock wageData={senSuitHolidayData} />
        )}

        {/* night allowance */}
        <StyledRow role='row'>
          <div>Night Allowance</div>
          <div>{totalHoursNight.toFixed(2)}</div>
          <div>{nightAllowanceRate}</div>
          <div>{amountNightAllowance.toFixed(2)}</div>
        </StyledRow>

        {/* total salary */}
        <StyledResultRow role='row'>
          <div>Total</div>
          <div></div>
          <div></div>
          <div>{salary.toFixed(2)}</div>
        </StyledResultRow>
      </StyledBody>
    </StyledTable>
  );
};

export default PayrollCalculationTable;
