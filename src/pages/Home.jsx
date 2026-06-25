import ContactMeSection from "../components/sections/Home/ContactMeSection";
import Hero from "../components/sections/Home/Hero";
import LatestPostsSection from "../components/sections/Home/LatestPostsSection";
import NavBar from "../components/layout/NavBar";
import { useRef } from "react";
import PageWrapper from "../components/UI/PageWrapper";
import BtnAsText from "../components/UI/BtnAsText";

export default function Home() {
  const heroRef = useRef(null);
  const latestRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <PageWrapper>
      <NavBar>
        <ul className="flex gap-8">
          <li>
            <BtnAsText onClick={() => heroRef.current.scrollIntoView()}>
              Home
            </BtnAsText>
          </li>
          <li>
            <BtnAsText onClick={() => latestRef.current.scrollIntoView()}>
              Latest
            </BtnAsText>
          </li>
          <li>
            <BtnAsText onClick={() => contactRef.current.scrollIntoView()}>
              Contact me
            </BtnAsText>
          </li>
        </ul>
      </NavBar>
      <main>
        <Hero ref={heroRef} />
        <div className="bg-palette-gray w-full">
          <LatestPostsSection ref={latestRef} />
          <ContactMeSection ref={contactRef} />
        </div>
      </main>
    </PageWrapper>
  );
}
