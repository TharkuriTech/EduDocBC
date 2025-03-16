import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  debugger
  const [user, setUser] = useState(null);

  useEffect(() => {
    debugger
    // Check for a logged-in user in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setUser({ token }); // Add additional user info decoding if needed
    }
  }, []);

  const login = (token) => {
    debugger
    localStorage.setItem("authToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
