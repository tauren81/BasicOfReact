import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

// Создаем контекст аутентификации
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Функция входа
  const login = async (email, password) => {
    try {
      // Здесь должна быть логика аутентификации (API запрос)
      // Для примера используем mock
      const mockUser = {
        id: '1',
        email,
        name: 'Test User',
        token: 'mock-jwt-token',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/store');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Функция выхода
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Функция регистрации
  const register = async (email, password, name) => {
    try {
      // Здесь должна быть логика регистрации (API запрос)
      // Для примера используем mock
      const mockUser = {
        id: '1',
        email,
        name,
        token: 'mock-jwt-token',
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/store');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Значение контекста
  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Хук для использования контекста
export function useAuth() {
  return useContext(AuthContext);
}
