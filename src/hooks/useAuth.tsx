import {
  authService,
  type LoginRequest,
  type RegisterRequest,
} from "@/api/services/AuthService";
import { decodeUserToken, type UserData } from "@/utils/authUtils";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  userToken: string | null;
  user: UserData | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setUserToken(token);
      setUser(decodeUserToken(token));
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    const token = await authService.Login(data);
    setUserToken(token);
    setUser(decodeUserToken(token));
  };

  const register = async (data: RegisterRequest) => {
    await authService.Register(data);
  };

  const logout = () => {
    authService.logout();
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        user,
        isAuthenticated: !!userToken,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
