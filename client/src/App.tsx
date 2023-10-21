import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import NavBar from "./components/molecules/NavBar";
import GBPage from "./pages/GBPage";
import HomePage from "./pages/HomePage";
import ICPage from "./pages/ICPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TopicCreatePage from "./pages/TopicCreatePage";
import Logout from "./routing/Logout";
import { Toaster } from "./shadcn-ui/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <Toaster />
        <NavBar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/topic/new" element={<TopicCreatePage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/" index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/interest-check" element={<ICPage />} />
          <Route path="/group-buy" element={<GBPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
