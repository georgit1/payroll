import SortBy from '../../ui/SortBy';
import { useJobs } from '../jobs/useJobs';

const DashboardFilter = () => {
  const { jobs } = useJobs();

  // Extract unique years from the jobs data and exlude null values
  const years = [
    ...new Set(jobs?.map((job) => new Date(job.date ?? '').getFullYear())),
  ].filter(Boolean);

  const currentYear = new Date().getFullYear();

  // Check if the current year is already in the years list
  const currentYearOptionExists = years.includes(currentYear);

  const filterOptions = [
    currentYearOptionExists
      ? null // Skip adding the default option if current year is already in the list
      : { value: `date-${currentYear}`, label: currentYear.toString() },
    ...years.map((year) => {
      return { value: `date-${year}`, label: year.toString() };
    }),
  ].filter(Boolean); // Remove any null values from the array

  return <SortBy options={filterOptions} />;
};

export default DashboardFilter;
