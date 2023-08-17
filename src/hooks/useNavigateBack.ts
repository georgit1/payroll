import { useNavigate } from 'react-router-dom';

export function useNavigateBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
