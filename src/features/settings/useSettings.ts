import { useQuery } from '@tanstack/react-query';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { getSettings } from '../../services/apiSettings';

export const useSettings = () => {
  const { user } = useUser();
  const userId = user?.id ?? '';

  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getSettings({ userId }),
  });

  return { isLoading, error, settings };
};
