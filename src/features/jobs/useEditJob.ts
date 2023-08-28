import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Services
import { addEditJob } from '../../services/apiJobs';

// Types
import { Job } from '../../types';

export const useEditJob = () => {
  const queryClient = useQueryClient();

  const { mutate: editJob, isLoading: isEditing } = useMutation({
    mutationFn: ({ newJobData, id }: { newJobData: Job; id: number }) =>
      addEditJob(newJobData, id),
    onSuccess: () => {
      toast.success('Job successfully edited');
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isEditing,
    editJob,
  };
};
