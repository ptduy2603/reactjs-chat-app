import { createContext, ReactNode, useEffect, useState } from "react";
import { isTokenExpired } from "../utils";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("Check user" + storedUser);

    if (storedUser) {
      try {
        if (token && !isTokenExpired(token)) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          localStorage.clear();
          setUser(null);
        }
      } catch (err) {
        console.error("Error parsing user data from localStorage", err);
      }
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
