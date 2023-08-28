import { useQuery } from '@tanstack/react-query';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { getWage } from '../../services/apiWage';

export const useWages = () => {
  const { user } = useUser();
  const userId = user?.id ?? '';

  const {
    isLoading,
    error,
    data: wages,
  } = useQuery({
    queryKey: ['wage'],
    queryFn: () => getWage({ userId }),
  });

  return { isLoading, error, wages };
};
