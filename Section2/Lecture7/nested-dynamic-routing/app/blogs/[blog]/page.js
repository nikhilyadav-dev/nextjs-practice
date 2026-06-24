export default async function Blog({ params }) {
  const { blog } = await params;
  return (
    <>
      <h1>Blog On: {blog}</h1>
    </>
  );
}
