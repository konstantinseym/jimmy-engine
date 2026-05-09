import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Posts from "./components/pages/Posts";
import NavBar from "./components/layout/NavBar";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<Posts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
