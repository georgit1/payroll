import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../../services/apiSettings';
import { useUser } from '../authentication/useUser';

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
