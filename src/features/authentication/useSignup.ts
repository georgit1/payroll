import { toast } from 'react-hot-toast';

// Hooks
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// Services
import { signup as signupApi } from '../../services/apiAuth';

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate('/dashboard', { replace: true });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
};
