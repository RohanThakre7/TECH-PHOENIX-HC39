import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for authentication state in localStorage
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setToken(authToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        throw data; // Throw the error data to be handled in the component
      }
    } catch (error) {
      throw error; // Pass the error object to the calling function
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
      } else {
        console.log(data);

        throw data; // Throw the error data to be handled in SignupPage
      }
    } catch (error) {
      throw error; // Pass the error object to SignupPage
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, signup, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
