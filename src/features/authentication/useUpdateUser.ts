import { toast } from 'react-hot-toast';

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { updateCurrentUser } from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isUpdating,
    updateUser,
  };
};
