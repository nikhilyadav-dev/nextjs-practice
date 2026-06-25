"use client";

import { usePathname } from "next/navigation";

export default function () {
  const path = usePathname();
  console.log(path);
  return (
    <>
      <h1>Blog Not Found ! {path}</h1>
      <p>Bete add some valid URL</p>
    </>
  );
}
