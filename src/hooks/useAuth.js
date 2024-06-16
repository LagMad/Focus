import { useEffect, useState } from "react";

export const useAuth = () => {
  const token = window.localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  return isAuthenticated;
};
