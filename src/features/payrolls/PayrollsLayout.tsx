import { styled } from 'styled-components';
import Spinner from '../../ui/Spinner';
import {
  calculateSalary,
  capitalizeFirstLetter,
  combinations,
  getHoursByDresscodeAndRole,
  groupDataByMonth,
  initializeSalaryOptions,
  toCamelCase,
  toPascalCase,
} from '../../utils/helpers';
import { useJobs } from '../jobs/useJobs';
import Payroll from './Payroll';
import { Combination, SalaryOptions } from '../../types';
import Empty from '../../ui/Empty';
import { useWage } from '../settings/useWage';

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
  const { wage } = useWage();
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
        const currentWage = wage?.find((wage) => wage.year === year.toString());

        const numberJobs = monthData?.length ?? 0;

        const totalHours = monthData
          ?.reduce((acc: number, cur: { total_hours: number }) => {
            return acc + cur.total_hours;
          }, 0)
          .toFixed(2);

        //

        const calculateSalaryOptions = (
          combinations: Combination[]
        ): SalaryOptions => {
          const salaryOptions: SalaryOptions = initializeSalaryOptions();

          combinations.forEach(({ dresscode, role, timeType }) => {
            let key: string | undefined;

            if (timeType.startsWith('total')) {
              const result = toCamelCase(timeType);

              key = `${result}${capitalizeFirstLetter(
                dresscode
              )}${capitalizeFirstLetter(role)}`;
            }

            if (timeType.startsWith('night')) {
              const result = toPascalCase(timeType);
              key = `total${result}${capitalizeFirstLetter(
                dresscode
              )}${capitalizeFirstLetter(role)}`;
            }

            if (key) {
              const holidayKey = `${key}Holiday`;
              salaryOptions[key] = Number(
                monthData
                  ? getHoursByDresscodeAndRole(
                      monthData,
                      dresscode,
                      role,
                      timeType
                    )
                  : 0
              );

              salaryOptions[holidayKey] = Number(
                monthData
                  ? getHoursByDresscodeAndRole(
                      monthData,
                      dresscode,
                      role,
                      timeType,
                      true
                    )
                  : 0
              );
            }
          });

          return salaryOptions;
        };

        const salaryOptions = calculateSalaryOptions(combinations);

        if (!currentWage) throw new Error('No wage found!');
        const salary = calculateSalary(salaryOptions, currentWage);

        // //////////////////////////////////////////////////
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

// ///////////////////
// const salaryOptions = {};

// combinations.forEach(({ dresscode, role, timeType }) => {
//   let key;
//   if (timeType.startsWith('total')) {
//     const result = toCamelCase(timeType);

//     key = `${result}${dresscode[0].toUpperCase()}${dresscode.slice(
//       1
//     )}${role[0].toUpperCase()}${role.slice(1)}`;
//   }

//   if (timeType.startsWith('night')) {
//     const result = toPascalCase(timeType);

//     key = `total${result}${dresscode[0].toUpperCase()}${dresscode.slice(
//       1
//     )}${role[0].toUpperCase()}${role.slice(1)}`;
//   }

//   const holidayKey = `${key}Holiday`;

//   salaryOptions[key] = Number(
//     monthData
//       ? getHoursByDresscodeAndRole(monthData, dresscode, role, timeType)
//       : 0
//   );

//   salaryOptions[holidayKey] = Number(
//     monthData
//       ? getHoursByDresscodeAndRole(
//           monthData,
//           dresscode,
//           role,
//           timeType,
//           true
//         )
//       : 0
//   );
// });
