import { createContext, useState } from "react";
import { api } from "../lib/axios";

export interface AuthContextDataProps {
  user: UserProps;
  signIn: (pwd: string, email: string) => Promise<void>;
}

interface UserProps {
  name: string;
  email: string;
  role: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  async function signIn(pwd: string, email: string) {
    try {
      const resp = await api.post(`login`, {
        email: email,
        password: pwd,
      });
      api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`;

      setUser({
        name: resp.data.user.name,
        email: resp.data.user.email,
        role: resp.data.user.role,
      });

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}