import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  display: flex;
  font-weight: 500;

  &:has(svg) {
    svg {
      margin-left: 1.1rem;
      width: 2.2rem;
      height: 2.2rem;
      cursor: pointer;
    }
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type FormRowProps = {
  label?: string;
  labelIcon?: ReactNode;
  error?: string;
  children: React.ReactElement | React.ReactElement[];
};

const FormRow = ({ label, labelIcon, error, children }: FormRowProps) => {
  // check if one or more children
  const childElements = Array.isArray(children) ? children : [children];

  return (
    <StyledFormRow>
      {label && (
        <Label htmlFor={childElements[0]?.props?.id}>
          {label} {labelIcon}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
