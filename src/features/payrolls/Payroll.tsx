import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  HiOutlineBanknotes,
  HiOutlineClock,
  HiOutlineTruck,
} from 'react-icons/hi2';

// Components
import Button from '../../ui/Button';
import ProgressBar from '../../ui/ProgessBar';
import PayrollStat from './PayrollStat';

const StyledPayroll = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  & button {
    grid-column: 3/4;
    margin: 1.2rem;

    /* iPad Mini */
    @media (max-width: 1024px) {
      grid-column: 2/4;
      margin: 0 1rem 1rem 10rem;
    }
  }
`;

const Label = styled.p`
  grid-column: 1 / -1;
  font-size: 2rem;
  font-weight: bold;
  padding: 1.2rem 2.4rem;
`;

type PayrollProps = {
  label: string;
  numJobs: number;
  hours: number;
  salary: number;
  insignificanceLimit: number;
  identifier: string;
};

const Payroll = ({
  label,
  numJobs,
  hours,
  salary,
  insignificanceLimit,
  identifier,
}: PayrollProps) => {
  const navigate = useNavigate();
  const maxLimit = insignificanceLimit;

  return (
    <StyledPayroll>
      <Label>{label}</Label>
      <PayrollStat
        title='Jobs'
        color='blue'
        icon={<HiOutlineTruck />}
        value={numJobs}
      />
      <PayrollStat
        title='Hours'
        color='green'
        icon={<HiOutlineClock />}
        value={hours}
      />
      <PayrollStat
        title='Salary'
        color='red'
        icon={<HiOutlineBanknotes />}
        value={salary}
      />
      <ProgressBar value={salary} max={maxLimit} />
      <Button size='small' onClick={() => navigate(`/payrolls/${identifier}`)}>
        See details
      </Button>
    </StyledPayroll>
  );
};

export default Payroll;
