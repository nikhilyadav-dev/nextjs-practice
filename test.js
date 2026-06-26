// const response = await fetch("https://jsonplaceholder.typicode.com/todos");
// const data = await response.json();
// console.log(
//   data.map(({ id }) => {
//     return { blogId: `${id}` };
//   }),
// );

async function result() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  return data.map(({ id }) => {
    return { blogId: `${id}` };
  });
  // return output;
  // return [{ blogID: "1" }, { blogID: "2" }, { blogID: "3" }];
}

result().then((response) => {
  console.log(response);
});
