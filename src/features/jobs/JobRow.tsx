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

// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { formatCurrency } from "../../utils/helpers";
// import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import { useCreateCabin } from "./useCreateCabin";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1.7fr 0.7fr 1fr 1fr 1fr 0.3fr;

//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.6rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `;

// const Price = styled.div`
//   font-family: 'Sono';
//   font-weight: 600;
// `;

// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `;

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
      date,
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
    ...(isHoliday ? { fontWeight: 'bold', color: 'var(--color-red-700)' } : {}),
  };

  return (
    // <Table.Row style={dresscode === 'suit' ? style : undefined}>
    <Table.Row style={style}>
      <div>{formatDate(date)}</div>
      <div>{project}</div>
      <div>{location}</div>
      <div>{checkIn}</div>
      <div>{checkOut}</div>
      <div>{removeTrailingZeros(totalTime)}</div>
      <div>{removeTrailingZeros(nightHours)}</div>
      {/* <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )} */}

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
