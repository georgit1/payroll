import DeleteUser from '../features/authentication/DeleteUser';
import UpdatePasswordForm from '../features/authentication/UpdatePasswordForm';
import UpdateUserDataForm from '../features/authentication/UpdateUserDataForm';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Account = () => {
  return (
    <>
      <Heading as='h1'>Update your account</Heading>

      <Row>
        <Heading as='h3'>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as='h3'>Update password</Heading>
        <UpdatePasswordForm />
      </Row>

      {/* <DeleteUser /> */}
    </>
  );
};

export default Account;
