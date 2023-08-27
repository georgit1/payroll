import supabase from './supabase';
import { PAGE_SIZE } from '../utils/constants';
import { Job } from '../types';

export const getJobs = async ({
  filter,
  sortBy,
  page,
  userId,
}: {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
  userId: string;
}) => {
  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  // FILTER
  if (filter) {
    // more flexible
    // query = query[filter.method || 'eq'](filter.field, filter.value);
    query = query.eq(filter.field, filter.value);
  }

  // SORT
  if (sortBy) {
    const { field, direction } = sortBy;

    query = query.order(field, {
      ascending: direction === 'asc',
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error('Jobs could not be loaded');
  }

  return { data, count };
};

export async function getJobsAfterYear(year: number, userId: string) {
  const startDate = new Date(year, 0, 1); // January 1st of the specified year
  const endDate = new Date(year + 1, 0, 0); // December 31st of the specified year

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString())
    .lt('date', endDate.toISOString());

  if (error) {
    console.error(error);
    throw new Error('Jobs could not get loaded');
  }

  return data;
}

export const getJobsByDate = async (
  month: number,
  year: number,
  userId: string
) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .gte('date', startDate.toISOString())
    .lte('date', endDate.toISOString())
    .order('date');

  if (error) {
    console.error(error);
    throw new Error('Job not found');
  }

  return data;
};

export const addEditJob = async (newJob: Job, id?: number) => {
  // Add/Edit job
  let query;

  // ADD
  if (!id) {
    query = supabase.from('jobs').insert([newJob]);
  }

  // EDIT
  if (id) {
    query = supabase.from('jobs').update(newJob).eq('id', id).select();
  }

  if (!query) return;

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Job could not be added');
  }

  return data;
};

export const deleteJob = async (id: number) => {
  const { data, error } = await supabase.from('jobs').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Job could not be deleted');
  }

  return data;
};
