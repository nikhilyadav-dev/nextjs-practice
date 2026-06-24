import Link from "next/link";

export default async function Home({ params, searchParams }) {
  console.log(await params);
  console.log(await searchParams);
  return (
    <>
      <h1>Home Page</h1>
      <p>
        {" "}
        <Link href="/blogs">Blogs</Link>
      </p>
      <p>
        <Link href="/about">About</Link>
      </p>
      <p>
        {" "}
        <Link href="/services">Services</Link>
      </p>
    </>
  );
}
