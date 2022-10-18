import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "./types/User";

export interface AuthProps {
  user: User | null | undefined;
  setUser: (user: User | null | undefined) => void;
}

const AuthContext = createContext<AuthProps>({
  user: undefined,
  setUser: (user: User | null | undefined) => {},
});

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => {
    axios.get("/me").then((res) => {
      setUser(res.data);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
