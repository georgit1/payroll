// Components
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import UpdateSettingsForm from '../features/settings/updateSettingsForm';

const Settings = () => {
  return (
    <Row>
      <Heading as='h1'>Update job settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
