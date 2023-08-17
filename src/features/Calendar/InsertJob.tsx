import { format } from 'date-fns';
import { useCalendar } from '../../context/CalenderContext';
import Modal from '../../ui/Modal';
import CreateJobForm from '../jobs/CreateJobForm';
import { ReactNode } from 'react';
import { JobType } from '../../types/collection';

type InsertJobProps = {
  button: ReactNode;
  jobToEdit?: JobType;
};

const InsertJob = ({ button, jobToEdit }: InsertJobProps) => {
  const { daySelected } = useCalendar();
  const formattedDate = format(daySelected, 'yyyy-MM-dd');
  const addJob = {
    date: formattedDate,
  };

  return (
    <Modal>
      <Modal.Open opens='insert'>{button}</Modal.Open>
      <Modal.Window name='insert'>
        <CreateJobForm jobToEdit={jobToEdit || addJob} isCalendar={true} />
      </Modal.Window>
    </Modal>
  );
};

export default InsertJob;
