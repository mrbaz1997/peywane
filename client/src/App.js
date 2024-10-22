import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/index";
import { Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
function App() {
  console.log("Start client/app.js");

  return (
    <div className="w-screen h-dvh overflow-x-hidden overflow-y-auto">
      <AuthProvider>
        <Suspense
          fallback={<span class="loading loading-ring loading-lg"></span>}
        >
          <RouterProvider router={browserRouter} />
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
