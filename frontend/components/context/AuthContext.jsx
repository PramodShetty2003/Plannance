import {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const refreshTimeoutRef = useRef(null);

  const isAuthenticated = !!user;

  const clearRefreshTimeout = () => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current);
      refreshTimeoutRef.current = null;
    }
  };

  const resetAuthStatus = () => {
    setUser(null);
    setError(null);
    clearRefreshTimeout();
  };

  const scheduleTokenRefresh = (expiresInSeconds) => {
    clearRefreshTimeout();
    if (expiresInSeconds) {
      refreshTimeoutRef.current = setTimeout(refreshTokens, (expiresInSeconds - 30) * 1000); // Refresh 30s early
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        scheduleTokenRefresh(data.expiresIn);
        navigate('/dashboard');
      } else {
        setError(data?.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login request failed. Please check your network.');
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        scheduleTokenRefresh(data.expiresIn);
        navigate('/dashboard');
      } else {
        setError(data?.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup request failed. Please check your network.');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      clearRefreshTimeout();
      resetAuthStatus();
      navigate('/login');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/check-auth', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        scheduleTokenRefresh(data.expiresIn);
      } else {
        resetAuthStatus();
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      resetAuthStatus();
    } finally {
      setLoading(false);
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await fetch('/api/user/refresh-tokens', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        scheduleTokenRefresh(data.expiresIn);
      } else {
        resetAuthStatus();
      }
    } catch (err) {
      console.error('Token refresh failed:', err);
      resetAuthStatus();
    }
  };

  useEffect(() => {
    checkAuthStatus();
    return () => {
      clearRefreshTimeout();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        error,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
