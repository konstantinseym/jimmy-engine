export default function GlassContainer({ children, addClassName }) {
  return (
    <div
      className={
        "border-palette-white/5 border bg-linear-to-br from-black/60 to-black/25 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.2)] " +
        addClassName
      }
    >
      {children}
    </div>
  );
}
