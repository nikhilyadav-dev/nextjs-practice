"use client";

import Likes from "@/components/Likes";
import Link from "next/link";

const Blogs = () => {
  //1 Accessing localStorage
  // if (typeof localStorage !== "undefined") {
  //   console.log(localStorage);
  // }

  //2 Accesing window object
  // if (typeof window !== "undefined") {
  //   console.log(window);
  // }
  console.log("Blogs Page");
  return (
    <>
      <nav>
        <ul className="navbar">
          <li>
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link href="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="nav-link active">
              Blogs
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Welcome to Our Blog</h1>
        <Likes />
      </div>
    </>
  );
};

export default Blogs;
