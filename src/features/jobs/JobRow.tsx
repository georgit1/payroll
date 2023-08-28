import { CSSProperties } from 'react';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

// Components
import CreateJobForm from './CreateJobForm';
import Modal from '../../ui/Modal';
import Menus from '../../ui/Menus';
import Table from '../../ui/Table';
import ConfirmDelete from '../../ui/ConfirmDelete';

// Hooks
import { useUser } from '../authentication/useUser';
import { useAddJob } from './useAddJob';
import { useDeleteJob } from './useDeleteJob';

// Helpers
import { formatDate, removeTrailingZeros } from '../../utils/helpers';

// Types
import { JobType } from '../../types/collection';

const JobRow = ({ job }: { job: JobType }) => {
  const { user } = useUser();
  const { deleteJob, isDeleting } = useDeleteJob();
  const { addJob, isAdding } = useAddJob();

  const userId = user?.id;

  const {
    id: jobId,
    date,
    project,
    location,
    dresscode,
    check_in: checkIn,
    check_out: checkOut,
    total_hours: totalTime,
    night_hours: nightHours,
    is_holiday: isHoliday,
    role,
  } = job;

  const handleDuplicate = () => {
    if (!userId) throw new Error('no user could be found');

    addJob({
      // date have to be null because logic doesn't allow to set new job when already exists on this date
      date: null,
      project: `${project} - (copy)`,
      location,
      dresscode,
      check_in: checkIn,
      check_out: checkOut,
      total_hours: totalTime,
      night_hours: nightHours,
      is_holiday: isHoliday,
      role,
      user_id: userId,
    });
  };

  const isSuit = dresscode === 'suit';

  const style: CSSProperties = {
    ...(isSuit
      ? {
          backgroundColor: 'var(--color-blue-100)',
          borderLeft: '3px solid var(--color-blue-700)',
        }
      : {}),
  };

  const dateStyle: CSSProperties = {
    ...(isHoliday
      ? { fontWeight: 'bold', color: 'var(--color-holiday-red)' }
      : {}),
  };

  return (
    <Table.Row style={style}>
      <div style={dateStyle}>{date ? formatDate(date) : '[no date]'}</div>
      <div>{project}</div>
      <div>{location}</div>
      <div>{checkIn}</div>
      <div>{checkOut}</div>
      <div>{removeTrailingZeros(totalTime)}</div>
      <div>{removeTrailingZeros(nightHours)}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={jobId} />

            <Menus.List id={jobId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicate}
                disabled={isAdding}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <CreateJobForm jobToEdit={job} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='job'
                disabled={isDeleting}
                onConfirm={() => deleteJob(jobId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default JobRow;
