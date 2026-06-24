import Link from "next/link";

export default function Services() {
  return (
    <>
      {" "}
      <h1>All Services</h1>
      <Link href="/services/web-dev">Web Development</Link>
      <br />
      <Link href="/services/app-dev">App Development</Link>
      <br />
      <Link href="/services/web-dev">Web/App Design</Link>
      <br />
      <Link href="/services/web-dev">SEO</Link>
    </>
  );
}
