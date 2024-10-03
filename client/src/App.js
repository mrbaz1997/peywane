import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
function App() {
  const queryClient = new QueryClient();

  console.log("Start client/app.js");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-dvh overflow-x-hidden overflow-y-auto">
        <Suspense
          fallback={<span class="loading loading-ring loading-lg"></span>}
        >
          <RouterProvider router={browserRouter} />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default App;
