import Hero from "../components/sections/Hero";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Word from "../pages/word";
import MainLayout from "./../layouts/mainLayout";

const routes = [
  {
    path: "/",
    index: true,
    element: <Hero />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/word/:id",
        element: <Word />,
      },
    ],
  },
];

const browserRouter = createBrowserRouter(routes);
export default browserRouter;
export { routes };
