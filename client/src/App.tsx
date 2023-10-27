import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PrivateRoutes from "./components/PrivateRoutes";
import AuthProvider from "./context/AuthProvider";
import ErrorPage from "./pages/ErrorPage";
import GBPage from "./pages/GBPage";
import HomePage from "./pages/HomePage";
import ICPage from "./pages/ICPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TopicCreatePage from "./pages/TopicCreatePage";
import TopicDetailPage from "./pages/TopicDetailPage";
import Logout from "./routing/Logout";
import { Toaster } from "./shadcn-ui/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col" data-theme="dracula">
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
            <Route path="/topic/:id" element={<TopicDetailPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
