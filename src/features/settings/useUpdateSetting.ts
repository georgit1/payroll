import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

// Types
import { SettingsType } from '../../types/collection';

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const userId = user?.id as string;

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: (newSettings: Partial<SettingsType>) =>
      updateSettingApi({ ...newSettings, userId }),
    onSuccess: () => {
      toast.success('Setting successfully edited');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return {
    isUpdating,
    updateSetting,
  };
};
