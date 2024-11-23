import React, { useEffect } from "react";
import NavBar from "./../components/NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);

  return isAuthenticated() ? (
    <div className="relative">
      <NavBar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/"} replace />
  );
};

export default MainLayout;
