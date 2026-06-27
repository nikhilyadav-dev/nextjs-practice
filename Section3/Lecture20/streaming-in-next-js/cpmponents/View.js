export default async function Views() {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve;
    }, 3000);
  });
  return <p>Views 20k</p>;
}
