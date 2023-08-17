import { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='checkbox'] {
    height: 2rem;
    width: 2rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  id: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children: React.ReactNode;
};

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;
