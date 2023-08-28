import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { addWage as addWageApi } from '../../services/apiWage';

// Types
import { WageType } from '../../types/collection';

export const useAddWage = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const userId = user?.id as string;

  const { mutate: addWage, isLoading: isAdding } = useMutation({
    mutationFn: (newWage: Partial<WageType>) =>
      addWageApi({ ...newWage, user_id: userId } as WageType),

    onSuccess: () => {
      toast.success('Wage successfully added');
      queryClient.invalidateQueries({ queryKey: ['wage'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isAdding, addWage };
};
