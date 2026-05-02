import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Post from "./components/pages/Post";
import NavBar from "./components/layout/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
