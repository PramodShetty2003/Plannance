import {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refreshTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const isAuthenticated = !!user;

  const getAccessToken = () => sessionStorage.getItem('accessToken');

  const clearAuth = () => {
    sessionStorage.removeItem('accessToken');
    setUser(null);
    setError(null);
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  };

  const scheduleTokenRefresh = (expiresInSeconds) => {
    if (!expiresInSeconds) return;
    const refreshInMs = (expiresInSeconds - 30) * 1000;
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    refreshTimeoutRef.current = setTimeout(() => {
      refreshTokens();
    }, refreshInMs);
  };

  const login = async (credentials) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      sessionStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      scheduleTokenRefresh(data.expiresIn);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err
    }
  };

  const signup = async (formData) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      sessionStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      scheduleTokenRefresh(data.expiresIn);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuth();
      navigate('/login');
    }
  };

  const refreshTokens = async () => {
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Refresh failed');

      sessionStorage.setItem('accessToken', data.accessToken);
      setUser(data.user);
      scheduleTokenRefresh(data.expiresIn);
    } catch (err) {
      console.warn('Token refresh failed:', err);
      clearAuth();
      navigate('/login');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/check-auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error();

      setUser(data.user);
      scheduleTokenRefresh(data.expiresIn);
    } catch {
      clearAuth();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
    if (accessToken) {
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  
    return () => {
      if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
