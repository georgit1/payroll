import { useMutation } from '@tanstack/react-query';
import { useUser } from './useUser';
import { deleteCurrentUser } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

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
