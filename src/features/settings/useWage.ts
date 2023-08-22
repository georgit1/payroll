import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getWage } from '../../services/apiWage';
import { useEffect } from 'react';

export const useWage = (year: string) => {
  const { user } = useUser();
  const userId = user?.id ?? '';

  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: wage,
  } = useQuery({
    queryKey: ['wage', year],
    queryFn: () => getWage({ userId }),
  });

  // Manually revalidate the query when the year changes
  useEffect(() => {
    queryClient.invalidateQueries(['wage', year]);
  }, [year, queryClient]);

  return { isLoading, error, wage };
};
