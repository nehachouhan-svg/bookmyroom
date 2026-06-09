import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    const adminInfo = localStorage.getItem('adminInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    if (adminInfo) {
      setAdmin(JSON.parse(adminInfo));
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const registerUser = async (name, email, password, phone) => {
    try {
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        phone,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success('Registration successful!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const loginAdmin = async (email, password) => {
    try {
      const { data } = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setAdmin(data);
      toast.success('Admin login successful!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Admin login failed');
      throw error;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminInfo');
    setAdmin(null);
    toast.success('Admin logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
