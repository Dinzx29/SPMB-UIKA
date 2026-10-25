import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Cek localStorage, supaya kalau refresh browser tetap login
    const saved = localStorage.getItem('spmb_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email) => {
    const userData = { email, loginAt: new Date().toISOString() };
    setUser(userData);
    localStorage.setItem('spmb_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('spmb_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);