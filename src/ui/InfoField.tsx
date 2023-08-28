import styled from 'styled-components';

type InfoFieldProps = {
  color: 'red' | 'green';
};

const InfoField = styled.div<InfoFieldProps>`
  grid-column: 1/4;

  background-color: var(--color-info-${(props) => props.color});
  border: 1px solid var(--color-info-radius-${(props) => props.color});
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  text-align: center;
  color: var(--color-grey-600);
`;

export default InfoField;
