import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Post from "./pages/Post";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Feed />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
