import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Services
import { deleteJob as deleteJobApi } from '../../services/apiJobs';

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteJob } = useMutation({
    mutationFn: deleteJobApi,
    onSuccess: () => {
      toast.success('Job successfully deleted');

      queryClient.invalidateQueries({
        queryKey: ['jobs'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteJob };
};
