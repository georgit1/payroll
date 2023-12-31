import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

// Constants
import { PAGE_SIZE } from '../../utils/constants';

// Hooks
import { useUser } from '../authentication/useUser';

// Services
import { getJobs } from '../../services/apiJobs';

export const useJobs = (enablePagination: boolean = false) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [searchParams] = useSearchParams();

  const userId = user?.id;
  if (!userId) throw new Error('user not found');

  // FILTER
  const filterValue = searchParams.get('dresscode');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'dresscode', value: filterValue };

  // SORT
  const sortByRow = searchParams.get('sortBy') || 'date-desc';
  const [field = 'date', direction = 'desc'] = sortByRow.split('-');
  const sortBy = { field, direction };

  // PAGINATION
  const page = enablePagination
    ? !searchParams.get('page')
      ? 1
      : Number(searchParams.get('page'))
    : 0;

  // QUERY
  const {
    isLoading,
    data: { data: jobs, count } = {},
    error,
  } = useQuery({
    queryKey: ['jobs', filter, sortBy, page],
    queryFn: () => {
      // NOTE experimental
      if (!userId) {
        return Promise.resolve({ data: [], count: 0 });
      }
      return getJobs({ filter, sortBy, page, userId: userId });
    },
  });

  // PRE-FETCHING
  const pageCount = count ? Math.ceil(count / PAGE_SIZE) : 0;

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['jobs', filter, sortBy, page + 1],
      queryFn: () =>
        getJobs({ filter, sortBy, page: page + 1, userId: userId }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['jobs', sortBy, page - 1],
      queryFn: () =>
        getJobs({ filter, sortBy, page: page - 1, userId: userId }),
    });
  }

  return { isLoading, error, jobs, count };
};
