import { HiArrowRightOnRectangle } from 'react-icons/hi2';

// Components
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

// Hooks
import { useLogout } from './useLogout';

const Logout = () => {
  const { logout, isLoading } = useLogout();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogoutClick}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
