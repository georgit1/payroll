import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useDarkMode } from '../../context/DarkModeContext';
import { Job } from '../../types';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

type HoursChartProps = {
  jobs: Job[];
};

const HoursChart = ({ jobs }: HoursChartProps) => {
  const { isDarkMode } = useDarkMode();

  const months: Record<string, string> = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };

  const orderedMonthKeys = Object.keys(months).sort();
  const dataArray = orderedMonthKeys.map((monthKey) => {
    const monthLabel = months[monthKey];
    const monthJobs = jobs.filter((job) => {
      if (job.date) {
        return job.date.startsWith(`${jobs[0]?.date?.slice(0, 4)}-${monthKey}`);
      }
    });

    const totalHours = monthJobs
      .reduce((sum, job) => sum + job.total_hours, 0)
      .toFixed(2);
    const nightHours = monthJobs
      .reduce((sum, job) => sum + job.night_hours, 0)
      .toFixed(2);

    return {
      label: monthLabel,
      totalHours,
      nightHours,
    };
  });

  const colors = isDarkMode
    ? {
        totalHours: { stroke: '#4f46e5', fill: '#4f46e5' },
        nightHours: { stroke: '#ff9800', fill: '#ff9800' }, // New color for nightHours
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalHours: { stroke: '#4f46e5', fill: '#c7d2fe' },
        nightHours: { stroke: '#ff9800', fill: '#ffc085' }, // New color for nightHours
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <Heading as='h2'>{`Job Hours ${jobs[0]?.date?.slice(0, 4)}`}</Heading>

      <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={dataArray}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey='totalHours'
            type='monotone'
            stroke={colors.totalHours.stroke}
            fill={colors.totalHours.fill}
            strokeWidth={2}
            name='Total hours'
          />
          <Area
            dataKey='nightHours'
            type='monotone'
            stroke={colors.nightHours.stroke}
            fill={colors.nightHours.fill}
            strokeWidth={2}
            name='Night hours'
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer height={300} width='100%'>
        <AreaChart data={dataArray}>
          <XAxis
            dataKey='label'
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray='4' />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey='totalHours'
            type='monotone'
            stroke={colors.totalHours.stroke}
            fill={colors.totalHours.fill}
            strokeWidth={2}
            name='Total hours'
          />

          <YAxis
            yAxisId='left' // Specify the yAxisId
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            dataKey='nightHours'
            type='monotone'
            stroke={colors.nightHours.stroke}
            fill={colors.nightHours.fill}
            strokeWidth={2}
            name='Night hours'
            yAxisId='left' // Use the same yAxisId as specified above
          />

          <YAxis
            yAxisId='right' // Specify another yAxisId
            orientation='right' // Position the yAxis on the right side
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          /> */}
      {/* Add another Area using the dataKey and yAxisId */}
      {/* <Area
      dataKey='anotherDataKey'
      type='monotone'
      stroke={colors.anotherData.stroke}
      fill={colors.anotherData.fill}
      strokeWidth={2}
      name='Another Data'
      yAxisId='right' // Use the same yAxisId as specified above
    /> */}
      {/* </AreaChart>
      </ResponsiveContainer> */}
    </StyledSalesChart>
  );
};

export default HoursChart;
