import FormContactMe from "../../features/FormContactMe";
import SectionHeader from "../../UI/SectionHeader";
import { forwardRef } from "react";

const SECTION_TITLE = "Contact me";

const ContactMeSection = forwardRef(function ContactMeSection(props, ref) {
  return (
    <section ref={ref} {...props} className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader>{SECTION_TITLE}</SectionHeader>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center px-2">
          <p className="text-center">I read every message personally.</p>
          <p className="text-center">
            Expect a thoughtful reply — nothing gets ignored.
          </p>
        </div>
        <FormContactMe />
      </div>
    </section>
  );
});

export default ContactMeSection;
