"use client";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();
  return (
    <>
      <p>Something Went Wrong Blog Page</p>
      <button
        onClick={() => {
          startTransition(() => {
            reset();
            router.refresh();
          });
        }}
      >
        Try Again
      </button>
    </>
  );
}
