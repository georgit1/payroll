import { styled } from 'styled-components';
import Spinner from '../../ui/Spinner';
import {
  calculateSalary,
  capitalize,
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
import { useSettings } from '../settings/useSettings';
import { Combination, SalaryOptions } from '../../types';
import Empty from '../../ui/Empty';

const StyledPayrollsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const PayrollsLayout = () => {
  const { jobs, isLoading } = useJobs();
  const { settings } = useSettings();
  const groupedJobs = jobs ? groupDataByMonth(jobs) : {};

  const dresscodes = ['vest', 'suit'];
  const roles = ['jun', 'sen'];

  if (isLoading) return <Spinner />;
  if (!jobs?.length) return <Empty resourceName='payrolls' />;

  return (
    <StyledPayrollsLayout>
      {/* Render a table for each month */}
      {Object.keys(groupedJobs).map((key) => {
        const monthData = groupedJobs[key];
        const date = new Date(monthData?.[0]?.date || Date.now()); // Get the date for the first row of the month
        const monthName = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const numberJobs = monthData?.length ?? 0;

        const totalHours = monthData
          ?.reduce((acc: number, cur: { total_hours: number }) => {
            return acc + cur.total_hours;
          }, 0)
          .toFixed(2);

        // const totalHoursVestJun = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'vest', 'jun', 'total_hours')
        //   : 0;

        // const totalHoursVestJunHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'vest',
        //       'jun',
        //       'total_hours',
        //       true
        //     )
        //   : 0;

        // const totalHoursVestSen = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'vest', 'sen', 'total_hours')
        //   : 0;

        // const totalHoursVestSenHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'vest',
        //       'sen',
        //       'total_hours',
        //       true
        //     )
        //   : 0;

        // const totalHoursSuitJun = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'suit', 'jun', 'total_hours')
        //   : 0;

        // const totalHoursSuitJunHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'suit',
        //       'jun',
        //       'total_hours',
        //       true
        //     )
        //   : 0;

        // const totalHoursSuitSen = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'suit', 'sen', 'total_hours')
        //   : 0;

        // const totalHoursSuitSenHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'suit',
        //       'sen',
        //       'total_hours',
        //       true
        //     )
        //   : 0;

        // const totalNightHoursVestJun = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'vest', 'jun', 'night_hours')
        //   : 0;

        // const totalNightHoursVestJunHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'vest',
        //       'jun',
        //       'night_hours',
        //       true
        //     )
        //   : 0;

        // const totalNightHoursVestSen = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'vest', 'sen', 'night_hours')
        //   : 0;

        // const totalNightHoursVestSenHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'vest',
        //       'sen',
        //       'night_hours',
        //       true
        //     )
        //   : 0;

        // const totalNightHoursSuitJun = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'suit', 'jun', 'night_hours')
        //   : 0;

        // const totalNightHoursSuitJunHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'suit',
        //       'jun',
        //       'night_hours',
        //       true
        //     )
        //   : 0;

        // const totalNightHoursSuitSen = monthData
        //   ? getHoursByDresscodeAndRole(monthData, 'suit', 'sen', 'night_hours')
        //   : 0;

        // const totalNightHoursSuitSenHoliday = monthData
        //   ? getHoursByDresscodeAndRole(
        //       monthData,
        //       'suit',
        //       'sen',
        //       'night_hours',
        //       true
        //     )
        //   : 0;

        // const salaryOptions = {
        //   totalHoursVestJun: Number(totalHoursVestJun),
        //   totalHoursVestJunHoliday: Number(totalHoursVestJunHoliday),

        //   totalHoursVestSen: Number(totalHoursVestSen),
        //   totalHoursVestSenHoliday: Number(totalHoursVestSenHoliday),

        //   totalHoursSuitJun: Number(totalHoursSuitJun),
        //   totalHoursSuitJunHoliday: Number(totalHoursSuitJunHoliday),

        //   totalHoursSuitSen: Number(totalHoursSuitSen),
        //   totalHoursSuitSenHoliday: Number(totalHoursSuitSenHoliday),

        //   totalNightHoursVestJun: Number(totalNightHoursVestJun),
        //   totalNightHoursVestJunHoliday: Number(totalNightHoursVestJunHoliday),

        //   totalNightHoursVestSen: Number(totalNightHoursVestSen),
        //   totalNightHoursVestSenHoliday: Number(totalNightHoursVestSenHoliday),

        //   totalNightHoursSuitJun: Number(totalNightHoursSuitJun),
        //   totalNightHoursSuitJunHoliday: Number(totalNightHoursSuitJunHoliday),

        //   totalNightHoursSuitSen: Number(totalNightHoursSuitSen),
        //   totalNightHoursSuitSenHoliday: Number(totalNightHoursSuitSenHoliday),
        // };

        // const salary = settings
        //   ? calculateSalary(salaryOptions, settings)
        //   : 999;

        // //////////////////////////////////////

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

        const salary = settings
          ? calculateSalary(salaryOptions, settings)
          : 999;

        // //////////////////////////////////////////////////

        return (
          <Payroll
            key={key}
            identifier={key}
            label={`${monthName} ${year}`}
            numJobs={numberJobs}
            hours={Number(totalHours)}
            salary={salary}
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
