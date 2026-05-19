export default function SectionHeader({ children }) {
  return (
    <div className="px-8 py-12">
      <h2 className="text-3xl font-semibold lg:text-4xl">{children}</h2>
    </div>
  );
}
