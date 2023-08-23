import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import CreateJobForm from './CreateJobForm';

import { JobType } from '../../types/collection';
import { useDeleteJob } from './useDeleteJob';
import { useAddJob } from './useAddJob';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { formatDate, removeTrailingZeros } from '../../utils/helpers';
import { CSSProperties } from 'react';
import { useUser } from '../authentication/useUser';

const JobRow = ({ job }: { job: JobType }) => {
  const { user } = useUser();
  const { isDeleting, deleteJob } = useDeleteJob();
  const { addJob } = useAddJob();

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
    ...(isHoliday ? { fontWeight: 'bold', color: 'var(--color-red-700)' } : {}),
  };

  return (
    // <Table.Row style={dresscode === 'suit' ? style : undefined}>
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
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
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
