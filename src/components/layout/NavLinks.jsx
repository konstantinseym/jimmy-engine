import BtnAsText from "../UI/BtnAsText";

export default function NavLinks({ sections, onNavClick }) {
  return (
    <ul className="flex gap-12">
      {sections.map((section) => (
        <li key={section.id}>
          <BtnAsText onClick={() => onNavClick(section.ref)}>
            {section.label}
          </BtnAsText>
        </li>
      ))}
    </ul>
  );
}
