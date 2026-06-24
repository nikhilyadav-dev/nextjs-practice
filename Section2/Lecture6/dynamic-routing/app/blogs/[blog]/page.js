export default async function Blog({ params }) {
  console.log(await params);
  return (
    <>
      <h1>Blog</h1>
    </>
  );
}
