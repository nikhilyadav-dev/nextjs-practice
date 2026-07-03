"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage({ error, reset }) {
  const router = useRouter();
  return (
    <>
      <p>Something Went Wrong About Page</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        Try Again
      </button>
    </>
  );
}
