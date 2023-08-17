import { useQuery } from '@tanstack/react-query';

// Services
import { getCurrentUser } from '../../services/apiAuth';

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
};
