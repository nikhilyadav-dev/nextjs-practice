import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Technical Agency</h1>
      <Link href="/about">
        {" "}
        <h2>About</h2>{" "}
      </Link>

      <Link href="/blogs">
        {" "}
        <h2>Blogs</h2>{" "}
      </Link>

      <Link href="/services">
        {" "}
        <h2>Services</h2>{" "}
      </Link>
      <Link href="/files">
        {" "}
        <h2>Files</h2>{" "}
      </Link>
    </>
  );
}
