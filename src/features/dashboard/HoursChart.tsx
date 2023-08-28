import styled from 'styled-components';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Components
import DashboardBox from './DashboardBox';
import Heading from '../../ui/Heading';

// Context
import { useDarkMode } from '../../context/DarkModeContext';

// Types
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
        return job.date.startsWith(`${jobs[0]?.date?.slice(0, 4) || ""}-${monthKey}`);
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

  // set y-Axis based on max total hours
  const maxTotalHours = Math.max(
    ...dataArray.map((item) => parseFloat(item.totalHours))
  );
  const roundedMaxTotalHours = Math.ceil(maxTotalHours / 5) * 5;

  const colors = isDarkMode
    ? {
        totalHours: { stroke: '#4f46e5', fill: '#4f46e5' },
        nightHours: { stroke: '#ff9800', fill: '#ff9800' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalHours: { stroke: '#4f46e5', fill: '#c7d2fe' },
        nightHours: { stroke: '#ff9800', fill: '#ffc085' },
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
            domain={[0, roundedMaxTotalHours]}
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
    </StyledSalesChart>
  );
};

export default HoursChart;
