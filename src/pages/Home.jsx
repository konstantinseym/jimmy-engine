import ContactMeSection from "../components/sections/Home/ContactMeSection";
import Hero from "../components/sections/Home/Hero";
import LatestPostsSection from "../components/sections/Home/LatestPostsSection";
import NavBar from "../components/layout/NavBar";
import { useRef } from "react";
import PageWrapper from "../components/UI/PageWrapper";

export default function Home() {
  const heroRef = useRef(null);
  const postsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = [
    {
      id: "home",
      label: "Home",
      ref: heroRef,
    },
    {
      id: "posts",
      label: "Latest posts",
      ref: postsRef,
    },
    {
      id: "contact",
      label: "Contact me",
      ref: contactRef,
    },
  ];

  function scrollIntoView(ref) {
    ref.current.scrollIntoView();
  }

  return (
    <PageWrapper>
      <NavBar sections={sections} onNavClick={scrollIntoView} />
      <main>
        <Hero ref={heroRef} />
        <div className="bg-palette-gray w-full">
          <LatestPostsSection ref={postsRef} />
          <ContactMeSection ref={contactRef} />
        </div>
      </main>
    </PageWrapper>
  );
}
