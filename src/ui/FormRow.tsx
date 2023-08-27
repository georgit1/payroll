import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type StyledFormRowProps = {
  applyMediaQuery?: boolean;
};

const StyledFormRow = styled.div<StyledFormRowProps>`
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

  /* for iPadMini */
  @media (max-width: 1024px) {
    grid-template-columns: 15rem 30rem 1fr;
  }

  ${(props) =>
    props.applyMediaQuery &&
    css`
      @media (max-width: 1024px) {
        display: none;
      }
    `}
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
  color: var(--color-holiday-font-red);
`;

type FormRowProps = {
  label?: string;
  labelIcon?: ReactNode;
  error?: string;
  applyMediaQuery?: boolean;
  children: React.ReactElement | React.ReactElement[];
};

const FormRow = ({
  label,
  labelIcon,
  error,
  applyMediaQuery = false,
  children,
}: FormRowProps) => {
  // check if one or more children
  const childElements = Array.isArray(children) ? children : [children];

  return (
    <StyledFormRow applyMediaQuery={applyMediaQuery}>
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
