import { createContext, useEffect } from "react";
import { useState } from "react";
import { getme } from "./services/auth.api.js";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const getandsetuser = async () => {
      try {
        console.log("calling getme");
        const response = await getme();
        console.log(response);
        if (response) {
          setuser(response.user);
        }
      } catch (error) {
        console.log(error);
        setuser(null);
      } finally {
        console.log("done loading");
        setloading(false);
      }
    };
    getandsetuser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
}
