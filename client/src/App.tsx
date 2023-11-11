import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSnapshot } from "valtio";
import NavBar from "./components/navigation/NavBar";
import PrivateRoutes from "./components/navigation/PrivateRoutes";
import AuthProvider from "./context/AuthProvider";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TopicDetailPage from "./pages/TopicDetailPage";
import TopicEditPage from "./pages/TopicEditPage";
import TopicsPage from "./pages/TopicsPage";
import Logout from "./routing/Logout";
import state from "./store";

function App() {
  const snap = useSnapshot(state);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen" data-theme={snap.theme}>
          <NavBar />
          <>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/topic/new" element={<TopicEditPage />} />
                <Route path="/topic/:id/edit" element={<TopicEditPage />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/me" element={<ProfilePage />} />
              </Route>
              <Route path="/" index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/interest-check"
                element={<TopicsPage status="IC" />}
              />
              <Route path="/group-buy" element={<TopicsPage status="GB" />} />
              <Route path="/closed" element={<TopicsPage status="CLOSED" />} />
              <Route path="/topic/:id" element={<TopicDetailPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
