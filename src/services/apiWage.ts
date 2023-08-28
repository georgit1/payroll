import supabase from './supabase';

// Types
import { Wage } from '../types';

export const getWage = async ({ userId }: { userId: string }) => {
  const { data, error } = await supabase
    .from('wage')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.log(error);
    throw new Error('Wage could not be loaded');
  }

  return data;
};

export const addWage = async (newWage: Wage & { user_id: string }) => {
  const { data, error } = await supabase
    .from('wage')
    .insert([newWage])
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('Wage could not be added');
  }

  return data;
};

export const updateWage = async ({
  userId,
  year,
  ...newWage
}: {
  userId: string;
  year: string;
}) => {
  const { data, error } = await supabase
    .from('wage')
    .update(newWage)
    .eq('user_id', userId)
    .eq('year', year);

  if (error) {
    console.log(error);
    throw new Error('Wage could not be updated');
  }

  return data;
};
