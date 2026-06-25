import Link from "next/link";

export const metadata = {
  title: "Services",
};

export default function Services() {
  return (
    <>
      {" "}
      <h1>All Services</h1>
      <Link href="/services/web-dev">
        {" "}
        <h2>Web Development</h2>
      </Link>
      <Link href="/services/app-dev">
        <h2>App Development</h2>
      </Link>
      <Link href="/services/web-dev">
        {" "}
        <h2>Web/App Design</h2>
      </Link>
      <Link href="/services/web-dev">
        {" "}
        <h2>SEO</h2>
      </Link>
    </>
  );
}
