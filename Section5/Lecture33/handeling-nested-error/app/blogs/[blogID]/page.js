const Blog = async ({ params }) => {
  const { blogID } = await params;

  // if (Math.random() > 0.5) {
  //   throw new Error("Greater than 0.5");
  // }

  return (
    <>
      <div>
        <h1>Welcome to Our Blog {blogID}</h1>
        <p>This is blog {blogID} page.</p>
      </div>
    </>
  );
};

export default Blog;
