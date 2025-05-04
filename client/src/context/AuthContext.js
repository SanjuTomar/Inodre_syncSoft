import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../services/api';
import {jwtDecode} from 'jwt-decode';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate(); 

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser ({ name: decoded.name });
    }
  }, [token]);

  const register = async (formData) => {
    try {
      const { data } = await apiRegister(formData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/blogs');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const login = async (formData) => {
    try {
      const { data } = await apiLogin(formData);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/blogs');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser (null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

