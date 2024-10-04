import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/index";
import { Suspense } from "react";
function App() {
  console.log("Start client/app.js");

  return (
    <div className="w-screen h-dvh overflow-x-hidden overflow-y-auto">
      <Suspense
        fallback={<span class="loading loading-ring loading-lg"></span>}
      >
        <RouterProvider router={browserRouter} />
      </Suspense>
    </div>
  );
}

export default App;
