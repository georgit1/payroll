import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getJobsAfterYear } from '../../services/apiJobs';
import { useUser } from '../authentication/useUser';

export function useRecentJobs() {
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  if (!user) throw new Error('No user could be found');
  const userId = user.id;

  // if no sortBy query exists take current year
  const currYear = !searchParams.get('sortBy')
    ? `date-${new Date().getFullYear().toString()}`
    : searchParams.get('sortBy');

  const [_, queryYear] = (currYear?.split('-') ?? []) as [
    string,
    string | undefined
  ];

  const { isLoading, data: jobs } = useQuery({
    queryFn: () => getJobsAfterYear(Number(queryYear), userId),
    queryKey: ['jobs', `${currYear}`],
  });

  return { isLoading, jobs };
}
