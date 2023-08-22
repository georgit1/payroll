import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addWage as addWageApi } from '../../services/apiWage';
import { toast } from 'react-hot-toast';
import { Wage } from '../../types';
import { useUser } from '../authentication/useUser';
import { WageType } from '../../types/collection';

export const useAddWage = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const userId = user?.id as string;

  const { mutate: addWage, isLoading: isAdding } = useMutation({
    mutationFn: (newWage: Partial<WageType>) =>
      addWageApi({ ...newWage, user_id: userId }),

    onSuccess: () => {
      toast.success('Wage successfully added');
      queryClient.invalidateQueries({ queryKey: ['wage'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isAdding, addWage };
};
