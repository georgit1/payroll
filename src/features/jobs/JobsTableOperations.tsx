// Components
import TableOperations from '../../ui/TableOperations';
import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';

const JobsTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField='dresscode'
        options={[
          { value: 'all', label: 'All' },
          { value: 'vest', label: 'Vest' },
          { value: 'suit', label: 'Suit' },
        ]}
      />

      <SortBy
        options={[
          { value: 'date-desc', label: 'Sort by date (recent first)' },
          { value: 'date-asc', label: 'Sort by date (earlier first)' },
          { value: 'project-asc', label: 'Sort by project (A-Z)' },
          { value: 'project-desc', label: 'Sort by project (Z-A)' },
          { value: 'location-asc', label: 'Sort by location (A-Z)' },
          { value: 'location-desc', label: 'Sort by location (Z-A)' },
          {
            value: 'total_hours-asc',
            label: 'Sort by total hours (low first)',
          },
          {
            value: 'total_hours-desc',
            label: 'Sort by total hours (high first)',
          },
        ]}
      />
    </TableOperations>
  );
};

export default JobsTableOperations;
