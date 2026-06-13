import FormContactMe from "../../features/FormContactMe";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";
import { useAuth } from "../../../context/authContext";
import BtnAsText from "../../UI/BtnAsText";

const SECTION_TITLE = "Contact me";

const ContactMeSection = forwardRef(function ContactMeSection(props, ref) {
  const { isAuthenticated, signIn, user } = useAuth();

  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-2">
          <p className="text-center">I read every message personally.</p>
          <p className="text-center">
            Expect a thoughtful reply
            {user ? " on " + user.email : " on email"}.
          </p>
        </div>
        {isAuthenticated ? (
          <FormContactMe />
        ) : (
          <div className="mt-12 text-center">
            <p>But please sign in first</p>
            <BtnAsText onClick={signIn}>Login via Google</BtnAsText>
          </div>
        )}
      </div>
    </section>
  );
});

export default ContactMeSection;
