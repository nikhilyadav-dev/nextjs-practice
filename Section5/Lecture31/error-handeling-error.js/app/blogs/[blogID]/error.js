"use client";

export default function ErrorPage({ error, reset }) {
  console.log(error.message);
  return (
    <>
      <p>Something Went Wrong</p>
      <button onClick={reset}>Try Again</button>
    </>
  );
}
