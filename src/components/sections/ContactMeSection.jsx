import FormContactMe from "../features/FormContactMe";
import SectionHeader from "../UI/SectionHeader";

const SECTION_TITLE = "Contact me";

export default function ContactMeSection() {
  return (
    <section className="mx-auto w-full max-w-7xl py-16">
      <SectionHeader title={SECTION_TITLE} />

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <p>I read every message personally.</p>
          <p>Expect a thoughtful reply — nothing gets ignored.</p>
        </div>
        <FormContactMe />
      </div>
    </section>
  );
}
