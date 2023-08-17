import UpdateSettingsForm from '../features/settings/updateSettingsForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Settings = () => {
  return (
    <Row>
      <Heading as='h1'>Update job settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
