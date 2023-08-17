import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

// const StyledSelect = styled.select`
//   border: 1px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-sm);
//   padding: 0.8rem 1.2rem;
//   box-shadow: var(--shadow-sm);
// `;

type StyledSelectProps = {
  type?: string;
};

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id?: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

type SelectRef = ForwardedRef<HTMLSelectElement>;

const Select = forwardRef(
  (
    {
      id,
      options,
      defaultValue,
      disabled,
      onBlur,
      onChange,
      ...props
    }: SelectProps,
    ref: SelectRef
  ) => {
    return (
      <StyledSelect
        ref={ref}
        id={id}
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </StyledSelect>
    );
  }
);
export default Select;
