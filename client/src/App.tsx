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
import TopicDetailPage from "./pages/TopicDetailPage";
import TopicEditPage from "./pages/TopicEditPage";
import Logout from "./routing/Logout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen" data-theme="dracula">
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/topic/new" element={<TopicEditPage />} />
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
