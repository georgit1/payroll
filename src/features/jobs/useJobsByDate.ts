import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { getJobsByDate } from '../../services/apiJobs';

export const useJobsByDate = () => {
  const { user } = useUser();
  const { identifier } = useParams();
  const [year, month] = identifier?.split('-') ?? [];

  const userId = user?.id;
  if (!userId) throw new Error('user not found');

  const {
    isLoading,
    error,
    data: jobs,
  } = useQuery({
    queryKey: ['jobsDate', month, year],
    queryFn: () => {
      return getJobsByDate(Number(month), Number(year), userId);
    },
    retry: false,
  });

  return { isLoading, error, jobs };
};
