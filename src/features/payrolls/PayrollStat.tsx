import { ReactNode } from 'react';
import styled from 'styled-components';
import { removeTrailingZeros } from '../../utils/helpers';

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);

  padding: 1.2rem;
  display: grid;
  grid-template-columns: 4.2rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.2rem;
  row-gap: 0.4rem;

  /* iPad Mini */
  @media (max-width: 1024px) {
    padding: 0.8rem;
    column-gap: 0.8rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 2.3rem;
    height: 2.3rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 500;
`;

type StatProps = {
  icon: ReactNode;
  title: string;
  value: number;
  color: string;
};

const PayrollStat = ({ icon, title, value, color }: StatProps) => {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{removeTrailingZeros(value)}</Value>
    </StyledStat>
  );
};

export default PayrollStat;
