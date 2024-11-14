import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckUser = () => {
  let navigate = useNavigate();
  let token = localStorage.getItem('access_token');
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  return token;
};

export default useCheckUser;
