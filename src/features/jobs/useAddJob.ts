import { toast } from 'react-hot-toast';

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Services
import { addEditJob } from '../../services/apiJobs';

export const useAddJob = () => {
  const queryClient = useQueryClient();

  const { mutate: addJob, isLoading: isAdding } = useMutation({
    mutationFn: addEditJob,
    onSuccess: () => {
      toast.success('Job successfully added');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isAdding, addJob };
};
