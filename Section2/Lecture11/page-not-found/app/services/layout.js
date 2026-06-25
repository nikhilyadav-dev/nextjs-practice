export const metadata = {
  title: "Services layout",
};
export default function ServiceLayout({ children }) {
  return (
    <section>
      <h1 style={{ background: "pink" }}>Service Layout</h1>
      {children}
    </section>
  );
}
