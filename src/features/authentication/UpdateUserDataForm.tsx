import { ChangeEvent, FormEvent, useState } from 'react';

// Components
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

// Hooks
import { useUser } from './useUser';
import { useUpdateUser } from './useUpdateUser';

const UpdateUserDataForm = () => {
  const { user } = useUser();
  const email = user?.email;
  const currentFullName = user?.user_metadata?.fullName;

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
        },
      }
    );
  };

  const handleCancel = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>

      <FormRow label='Full name'>
        <Input
          type='text'
          value={fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
          id='fullName'
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAvatar(e.target.files?.[0])
          }
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
