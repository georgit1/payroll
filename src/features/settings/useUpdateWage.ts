import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { updateWage as updateWageApi } from '../../services/apiWage';

// Types
import { WageType } from '../../types/collection';

export const useUpdateWage = (selctedYear: string) => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const userId = user?.id as string;

  const { mutate: updateWage, isLoading: isUpdating } = useMutation({
    mutationFn: (newWage: Partial<WageType>) =>
      updateWageApi({ ...newWage, year: selctedYear, userId }),
    onSuccess: () => {
      toast.success('Wage table successfully edited');
      queryClient.invalidateQueries({ queryKey: ['wage'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isUpdating,
    updateWage,
  };
};
