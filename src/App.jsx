import ContactMeSection from "./components/sections/ContactMeSection";
import LatestPostsSection from "./components/sections/LatestPostsSection";
import NavBar from "./components/layout/NavBar";
import Hero from "./components/sections/Hero";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <LatestPostsSection />
        <ContactMeSection />
      </main>
    </>
  );
}
