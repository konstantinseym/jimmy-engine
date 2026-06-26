import ContactMeSection from "../components/sections/Home/ContactMeSection";
import Hero from "../components/sections/Home/Hero";
import LatestPostsSection from "../components/sections/Home/LatestPostsSection";
import NavBar from "../components/layout/NavBar";
import { useRef } from "react";
import PageWrapper from "../components/UI/PageWrapper";
import Btn from "../components/UI/Btn";

export default function Home() {
  const heroRef = useRef(null);
  const latestRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <PageWrapper>
      <NavBar>
        <ul className="flex gap-8">
          <li>
            <Btn
              variant="text"
              onClick={() => heroRef.current.scrollIntoView()}
            >
              Home
            </Btn>
          </li>
          <li>
            <Btn
              variant="text"
              onClick={() => latestRef.current.scrollIntoView()}
            >
              Latest
            </Btn>
          </li>
          <li>
            <Btn
              variant="text"
              onClick={() => contactRef.current.scrollIntoView()}
            >
              Contact me
            </Btn>
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
