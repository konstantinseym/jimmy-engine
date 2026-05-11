import ContactMeSection from "../components/sections/Home/ContactMeSection";
import FadeInBlock from "../components/UI/FadeInBlock";
import Hero from "../components/sections/Home/Hero";
import LatestPostsSection from "../components/sections/Home/LatestPostsSection";
import NavBar from "../components/layout/NavBar";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const heroRef = useRef(null);
  const postsRef = useRef(null);
  const contactRef = useRef(null);

  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    {
      id: "hero",
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
    ref.current?.scrollIntoView();
  }

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      },
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <NavBar
        sections={sections}
        activeSection={activeSection}
        onNavClick={scrollIntoView}
      />
      <main>
        <Hero ref={heroRef} data-section="hero" />
        <FadeInBlock key="postsFadeIn">
          <LatestPostsSection ref={postsRef} data-section="posts" />
        </FadeInBlock>
        <FadeInBlock key="contactFormFadeIn">
          <ContactMeSection ref={contactRef} data-section="contact" />
        </FadeInBlock>
      </main>
    </>
  );
}
