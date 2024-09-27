import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/index";

function App() {
    console.log("Start client/app.js")
  return (
    <div className="w-screen h-dvh overflow-x-hidden overflow-y-auto">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
