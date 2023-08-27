import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import { useDeleteUser } from './useDeleteUser';

const DeleteUser = () => {
  const { deleteUser, isDeleting } = useDeleteUser();

  return (
    <div>
      <Modal>
        <Modal.Open opens='delete-user'>
          <Button variation='danger'>Delete user</Button>
        </Modal.Open>

        <Modal.Window name='delete-user'>
          <ConfirmDelete
            resourceName='user'
            disabled={isDeleting}
            onConfirm={() => deleteUser()}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default DeleteUser;
