import { Wage } from '../types';
import supabase from './supabase';

export const getWage = async ({
  userId,
}: // year,
{
  userId: string;
  // year: string;
}) => {
  const { data, error } = await supabase
    .from('wage')
    .select('*')
    .eq('user_id', userId);
  // .eq('year', year)
  // .single();

  if (error) {
    console.log(error);
    throw new Error('Wage could not be loaded');
  }

  return data;
};

export const addWage = async (newWage: Wage) => {
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
