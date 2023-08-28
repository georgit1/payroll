import { useCallback, useState } from 'react';
import styled from 'styled-components';

// Components
import Heading from '../ui/Heading';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import SignupForm from '../features/authentication/SignUpForm';

type LoginLayoutProps = {
  width: string;
};

const LoginLayout = styled.main<LoginLayoutProps>`
  min-height: 100vh;
  display: grid;
  grid-template-columns: ${(props) => props.width};
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Footer = styled.p`
  padding: 0 1.8rem;

  & span {
    margin-left: 0.4rem;
    font-weight: bolder;
    color: var(--color-brand-600);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: var(--color-brand-700);
    }
  }
`;

function Login() {
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currVariant) => (currVariant === 'login' ? 'signUp' : 'login'));
  }, []);

  return (
    <LoginLayout width={variant === 'login' ? '48rem' : '78rem'}>
      <Logo />
      <Heading as='h4'>
        {variant === 'login' ? 'Log in to your account' : 'Create an account'}
      </Heading>
      {variant === 'login' ? <LoginForm /> : <SignupForm />}

      <Footer>
        {variant === 'login'
          ? 'First time using Payroll?'
          : 'Already have an account?'}
        <span onClick={toggleVariant}>
          {variant === 'login' ? 'Create new Account' : 'Login'}
        </span>
      </Footer>
    </LoginLayout>
  );
}

export default Login;
