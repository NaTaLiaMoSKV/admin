import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Navigation />

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <ToastContainer autoClose={2000} pauseOnHover />
    </>
  );
};

export default Layout;
