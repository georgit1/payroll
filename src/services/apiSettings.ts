import supabase from './supabase';

export const getSettings = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.log(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
};

export const updateSetting = async ({
  userId,
  ...newSettings
}: {
  userId: string;
}) => {
  const { data, error } = await supabase
    .from('settings')
    .update(newSettings)
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    throw new Error('Settings could not be updated');
  }

  return data;
};
