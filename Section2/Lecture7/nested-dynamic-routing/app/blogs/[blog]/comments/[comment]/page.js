export default async function Comment({ params }) {
  const { blog, comment } = await params;
  return (
    <>
      <h1>
        Comment No: <i>{comment}</i> On Blog: <i>{blog}</i>{" "}
      </h1>
    </>
  );
}
