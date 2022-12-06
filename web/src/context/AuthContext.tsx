import { createContext, useEffect, useState } from "react";

export interface AuthContextDataProps {
  user: UserProps;
  setUser: (user: UserProps) => void;
}

interface UserProps {
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  return (
    <AuthContext.Provider value={{
      setUser,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}