import { createContext, useState, useContext, useEffect } from 'react';
import { apiEndpoints } from '../apiConfig';

type User = {
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: AuthProviderProps)  {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const authTokenKey = 'authToken';

  useEffect(() => {
    const verifyUserSession = async () => {
      const token = localStorage.getItem(authTokenKey);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiEndpoints.validateMe, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem(authTokenKey);
          setUser(null);
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        localStorage.removeItem(authTokenKey);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUserSession();
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem(authTokenKey, token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(authTokenKey);
    setUser(null);
  };

  const authContextValue = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
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

export default AuthProvider;