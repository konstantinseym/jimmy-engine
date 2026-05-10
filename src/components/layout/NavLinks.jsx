import BtnAsText from "../UI/BtnAsText";

export default function NavLinks({ sections, activeSection, onNavClick }) {
  return (
    <ul className="flex gap-12">
      {sections.map((section) => (
        <li key={section.id}>
          <BtnAsText
            onClick={() => onNavClick(section.ref)}
            highlighted={section.id === activeSection}
          >
            {section.label}
          </BtnAsText>
        </li>
      ))}
    </ul>
  );
}
