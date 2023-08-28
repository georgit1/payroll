import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

// Hooks
import { useUser } from './useUser';

// Services
import { deleteCurrentUser } from '../../services/apiAuth';

export const useDeleteUser = () => {
  const { user } = useUser();
  const userId = user?.id as string;

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteCurrentUser({ userId }),
    onSuccess: () => {
      toast.success('User successfully deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteUser,
  };
};
