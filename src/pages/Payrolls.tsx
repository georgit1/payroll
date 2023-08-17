import PayrollsLayout from '../features/payrolls/PayrollsLayout';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

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
