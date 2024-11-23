import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLoaggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState(undefined);

  const handleLogin = (userInfo) => {
    if (userInfo) {
      setUser(userInfo);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(userInfo));
    }
  };

  const handleLoguout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUser(undefined);
  };

  useEffect(() => {
    console.log("use effect");
    const userSaved = JSON.parse(localStorage.getItem("user"));
    if (userSaved) {
      setUser(userSaved);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  return {
    user,
    isLoaggedIn,
    handleLogin,
    handleLoguout,
  };
};

export default useAuth;
