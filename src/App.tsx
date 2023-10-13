import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import NewTopic from "./pages/NewTopic";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group-buy" element={<Detail />} />
        <Route path="/interest-check" element={<NewTopic />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
