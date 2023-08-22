import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateWage as updateWageApi } from '../../services/apiWage';
import { useUser } from '../authentication/useUser';
import { WageType } from '../../types/collection';
// import { useEffect } from 'react';

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

  // Manually revalidate the query when the year changes
  // useEffect(() => {
  //   queryClient.invalidateQueries(['wage', selctedYear]);
  // }, [selctedYear, queryClient]);

  return {
    isUpdating,
    updateWage,
  };
};
