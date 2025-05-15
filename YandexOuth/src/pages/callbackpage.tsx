// src/pages/CallbackPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../store/authstore';

export const CallbackPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      login(code).then(() => {
        navigate('/dashboard');
      });
    } else {
      navigate('/login');
    }
  }, [login, navigate]);

  return <div>Processing login...</div>;
};
