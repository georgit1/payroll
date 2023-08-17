import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJob as deleteJobApi } from '../../services/apiJobs';
import { toast } from 'react-hot-toast';

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
