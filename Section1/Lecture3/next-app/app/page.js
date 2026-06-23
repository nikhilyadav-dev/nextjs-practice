"use client";

import Image from "next/image";

export default function Home() {
  console.log("running next");
  return (
    <>
      <button
        onClick={() => {
          console.log("clicked");
        }}
      >
        click
      </button>
    </>
  );
}
