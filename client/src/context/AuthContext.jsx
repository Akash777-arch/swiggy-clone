import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("swiggy_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - replace with real API call
    const mockUser = {
      id: "1",
      name: "Rahul Sharma",
      email,
      phone: "+91 98765 43210",
      avatar: "RS",
    };
    setUser(mockUser);
    localStorage.setItem("swiggy_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("swiggy_user");
    localStorage.removeItem("swiggy_cart");
  };

  const register = (name, email, password, phone) => {
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };
    setUser(newUser);
    localStorage.setItem("swiggy_user", JSON.stringify(newUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;