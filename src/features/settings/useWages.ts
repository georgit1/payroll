import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getWage } from '../../services/apiWage';

// export const useWage = (year?: string) => {
export const useWages = () => {
  const { user } = useUser();
  const userId = user?.id ?? '';

  const {
    isLoading,
    error,
    //NOTE refetch not in use
    refetch,
    data: wages,
  } = useQuery({
    // queryKey: ['wage', year],
    queryKey: ['wage'],
    queryFn: () => getWage({ userId }),
    // NOTE mot in use
    // prevent caching, to ensure that ui updates on changing year in Settings page
    // cacheTime: 0,
  });

  return { isLoading, refetch, error, wages };
};
