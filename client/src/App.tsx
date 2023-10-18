import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewTopic from "./pages/NewTopic";
import Signup from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group-buy" element={<Detail />} />
          <Route path="/interest-check" element={<NewTopic />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
