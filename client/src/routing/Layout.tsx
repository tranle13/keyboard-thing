import Footer from "@/components/molecules/Footer";
import NavBar from "@/components/molecules/NavBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};
