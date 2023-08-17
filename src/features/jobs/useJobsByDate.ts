import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getJobsByDate } from '../../services/apiJobs';

export const useJobsByDate = () => {
  const { identifier } = useParams();
  const [year, month] = identifier?.split('-') ?? [];

  const {
    isLoading,
    error,
    data: jobs,
  } = useQuery({
    queryFn: () => getJobsByDate(Number(month), Number(year)),
    queryKey: ['jobsDate', month, year],
    retry: false,
  });

  return { isLoading, error, jobs };
};
