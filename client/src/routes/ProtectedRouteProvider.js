import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteProvider = () => {
  const [canView, setCanView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) navigate("/signin");
    else setCanView(true);
  });

  return canView ? <Outlet /> : null;
};

export default ProtectedRouteProvider;
