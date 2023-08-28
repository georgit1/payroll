// Components
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import PayrollsLayout from '../features/payrolls/PayrollsLayout';

const Payrolls = () => {
  return (
    <>
      <Row>
        <Heading as='h1'>Payrolls</Heading>
      </Row>

      <PayrollsLayout />
    </>
  );
};

export default Payrolls;
