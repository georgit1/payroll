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

const StyledNumJobsChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  margin-top: 4rem;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

type NumJobsChartProps = {
  jobs: Job[];
};

const NumJobsChart = ({ jobs }: NumJobsChartProps) => {
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

    return {
      label: monthLabel,
      numJobs: monthJobs.length,
    };
  });

  const colors = isDarkMode
    ? {
        numJobs: { stroke: '#22c55e', fill: '#22c55e' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        numJobs: { stroke: '#16a34a', fill: '#dcfce7' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledNumJobsChart>
      <Heading as='h2'>{`Number Jobs ${jobs[0]?.date?.slice(0, 4)}`}</Heading>

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
            dataKey='numJobs'
            type='monotone'
            stroke={colors.numJobs.stroke}
            fill={colors.numJobs.fill}
            strokeWidth={2}
            name='Total jobs'
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledNumJobsChart>
  );
};

export default NumJobsChart;
