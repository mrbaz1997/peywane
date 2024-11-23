import { createBrowserRouter } from "react-router-dom";
import Hero from "../components/sections/Hero";
import { networkGetWords } from "../network";
import SignIn from "../pages/auth/signin";
import SignUp from "../pages/auth/signup";
import Word from "../pages/word";
import MainLayout from "./../layouts/mainLayout";

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
