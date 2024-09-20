import React from "react";
import NavBar from "./../components/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="relative">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
