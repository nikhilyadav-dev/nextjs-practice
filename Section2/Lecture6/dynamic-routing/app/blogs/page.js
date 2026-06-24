import Link from "next/link";

export default function Blogs() {
  return (
    <>
      <p>
        <Link href="/blogs/blog1">Blog1</Link>
      </p>
      <p>
        <Link href="/blogs/blog2">Blog2</Link>
      </p>
    </>
  );
}
