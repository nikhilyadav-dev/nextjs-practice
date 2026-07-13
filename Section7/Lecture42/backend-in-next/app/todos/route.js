// import { writeFile, readFile } from "fs/promises";
//1
// await writeFile("hello.txt", "Hello Nikhil Yadav");
//2
// const content = await readFile("hello.txt", "utf-8");
// console.log(content);
//3
// console.log(process.cwd());

import http from "http";

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.end("Hello from server");
});

server.listen(4000, () => {
  console.log("Server listing on port 400");
});
