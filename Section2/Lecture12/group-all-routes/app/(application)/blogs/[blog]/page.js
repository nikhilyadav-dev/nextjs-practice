import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { blog } = await params;
  return {
    title: `Blog ${blog}`,
  };
}

export default async function Blog({ params }) {
  const { blog } = await params;
  if (isNaN(blog)) {
    notFound();
  }
  return (
    <>
      <h1>Blog on : {blog}</h1>
    </>
  );
}
