import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateJobForm from './CreateJobForm';

const AddJob = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='job-form'>
          <Button>Add new job</Button>
        </Modal.Open>
        <Modal.Window name='job-form'>
          <CreateJobForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddJob;
