import ContactMe from "../components/sections/ContactMe";
import Hero from "../components/sections/Hero";
import Latest from "../components/sections/Latest";
import NavBar from "../components/features/NavBar";
import { useRef } from "react";
import PageWrapper from "../components/UI/PageWrapper";
import Button from "../components/UI/Button";

export default function Home() {
  const heroRef = useRef(null);
  const latestRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <PageWrapper>
      <NavBar>
        <ul className="flex gap-8">
          <li>
            <Button
              variant="text"
              onClick={() => heroRef.current.scrollIntoView()}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => latestRef.current.scrollIntoView()}
            >
              Latest
            </Button>
          </li>
          <li>
            <Button
              variant="text"
              onClick={() => contactRef.current.scrollIntoView()}
            >
              Contact me
            </Button>
          </li>
        </ul>
      </NavBar>
      <main>
        <Hero ref={heroRef} />
        <div className="bg-surface w-full">
          <Latest ref={latestRef} />
          <ContactMe ref={contactRef} />
        </div>
      </main>
    </PageWrapper>
  );
}
