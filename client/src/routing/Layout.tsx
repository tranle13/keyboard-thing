import Footer from "@/components/Footer";
import NavBar from "@/components/navigation/NavBar";
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
