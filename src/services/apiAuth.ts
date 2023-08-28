import supabase, { supabaseUrl } from './supabase';

// Data
import { defaultSettings, defaultWage } from '../data/data-defaultValues';

// Types
import {
  LoginProps,
  SignUpProps,
  UpdateUserProps,
  UserAttributes,
} from '../types';

export const signup = async ({ fullName, email, password }: SignUpProps) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error('error on getting user data');

  // Insert default settings into the "settings" table
  const { error: settingsError } = await supabase
    .from('settings')
    .insert([{ user_id: data.user?.id, ...defaultSettings }]);

  if (settingsError) throw new Error(settingsError.message);

  // insert default wage values into the "wage" table
  const { error: wageError } = await supabase
    .from('wage')
    .insert([{ user_id: data.user?.id, ...defaultWage }]);

  if (wageError) throw new Error(wageError.message);

  return data;
};

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: UpdateUserProps) => {
  const { data: user } = await supabase.auth.getUser();

  // update password OR fullName
  let updateData: UserAttributes = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // Delete old avatar if it exists
  if (user.user?.user_metadata.avatar) {
    const oldAvatarKey = user.user.user_metadata.avatar.split('/').pop();
    await supabase.storage.from('avatars').remove([oldAvatarKey]);

    // Remove avatar property from user_metadata
    const updatedUser = await supabase.auth.updateUser({
      data: { avatar: null }, // or remove the avatar property
    });

    if (updatedUser.error) throw new Error(updatedUser.error.message);
  }

  // update avatar in the user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
};

export const deleteCurrentUser = async ({ userId }: { userId: string }) => {
  // delete user
  // no user related table data must be deleted because they have foreign key relation -> on delete: Cascade
  const { data: deleteUserResponse, error: deleteUserError } =
    await supabase.auth.admin.deleteUser(userId);

  if (deleteUserError) {
    throw new Error(deleteUserError.message);
  }

  return deleteUserResponse;
};
