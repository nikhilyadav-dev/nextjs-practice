const Blog = async ({ params }) => {
  const { blogID } = await params;

  // 1
  // if (blogID % 2 == 0) {
  //   throw new Error("Blog only can only be an odd number");
  // }

  //2
  if (Math.random() > 0.5) {
    throw new Error("Greater than 0.5");
  }

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
