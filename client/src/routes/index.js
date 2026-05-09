import { createBrowserRouter } from "react-router-dom";
import Hero from "../components/sections/Hero";
import { networkGetWords } from "../network";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import Google from "../pages/auth/google";
import Word from "../pages/word";
import MainLayout from "./../layouts/mainLayout";
//import ProtectedRouteProvider from "./ProtectedRouteProvider";
import GoogleLoginButton from "../pages/auth/google";

const routes = [
  {
    path: "/",
    index: true,
    element: <Hero />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/google",
    element: <Google />,
  },
  {
    //element: <ProtectedRouteProvider />,
    element: <MainLayout />,
    children: [
      {
        path: "/word",
        element: <Word />,
        loader: networkGetWords,
      },
    ],
  },
];

const browserRouter = createBrowserRouter(routes);
export default browserRouter;
export { routes };
