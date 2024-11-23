import React, { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/index";
import useToast from "./hooks/useToast";
import Toast from "./components/common/Toast";

function App() {
  const { content, isShow, showToast, type } = useToast();

  useEffect(() => {
    const handleShowToastOnOnline = () =>
      showToast({
        content: "دووبارە پەیوەندیت بە ئینتەرنێتەوە کردووە.",
        type: "success",
      });
    const handleShowToastOnOffline = () =>
      showToast({ content: "ئینتەرنێتەکەت لەکارکەوتووە !", type: "warning" });

    window.addEventListener("online", handleShowToastOnOnline);
    window.addEventListener("offline", handleShowToastOnOffline);

    return () => {
      window.removeEventListener("online", handleShowToastOnOnline);
      window.removeEventListener("offline", handleShowToastOnOffline);
    };
  }, [showToast]);

  return (
    <div className="w-screen h-dvh overflow-x-hidden overflow-y-auto">
      <Suspense
        fallback={<span class="loading loading-ring loading-lg"></span>}
      >
        <RouterProvider router={browserRouter} />
      </Suspense>
      <Toast content={content} isShow={isShow} type={type} />
    </div>
  );
}

export default App;
