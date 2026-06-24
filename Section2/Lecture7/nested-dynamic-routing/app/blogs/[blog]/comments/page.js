export default async function Comments({ params }) {
  const { blog } = await params;
  return (
    <>
      <h1>All comments On Blog :{blog} </h1>
    </>
  );
}
