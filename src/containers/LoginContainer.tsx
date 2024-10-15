import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components';
import { loginRequest } from '../services'
import { useAuthStore } from '../store'

const LoginContainer: React.FC = () => {
  const setToken = useAuthStore(state => state.setToken)
  const setRole = useAuthStore(state => state.setRole)
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSubmit = async (email: string, password: string) => {
    try {
      const resLogin = await loginRequest(email, password);
      setToken(resLogin.data.token)
      setRole(resLogin.data.role)
      navigate('/courses');
      console.log("Logged in!")
      console.log(resLogin)
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit} error={error} />
  );
};

export default LoginContainer;
