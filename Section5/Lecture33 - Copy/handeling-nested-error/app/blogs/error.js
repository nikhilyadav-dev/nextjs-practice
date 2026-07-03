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
          //Method 1
          // window.location.reload();

          //Method 2
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
