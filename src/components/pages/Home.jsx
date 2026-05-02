import ContactMeSection from "../sections/ContactMeSection";
import Hero from "../sections/Hero";
import LatestPostsSection from "../sections/LatestPostsSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestPostsSection />
      <ContactMeSection />
    </main>
  );
}
