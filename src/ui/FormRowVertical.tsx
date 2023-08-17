import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowVerticalProps = {
  label?: string;
  error?: string;
  children: React.ReactElement | React.ReactElement[];
};

const FormRowVertical = ({ label, error, children }: FormRowVerticalProps) => {
  // check if one or more children
  const childElements = Array.isArray(children) ? children : [children];

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childElements[0]?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRowVertical;
