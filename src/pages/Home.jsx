import ContactMeSection from "../components/sections/Home/ContactMeSection";
import Hero from "../components/sections/Home/Hero";
import LatestPostsSection from "../components/sections/Home/LatestPostsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestPostsSection />
      <ContactMeSection />
    </main>
  );
}
