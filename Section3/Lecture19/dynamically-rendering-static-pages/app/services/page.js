import { cookies } from "next/headers";
import Link from "next/link";

//Method 1
// export const dynamic = "force-dynamic";
// export const dynamic = "auto";
// export const dynamic = "force-static";
// export const dynamic = "error";

const Services = async ({ searchParams }) => {
  //Method 2
  const serach = searchParams;
  console.log(serach);

  //Method 3
  // const myCookies = await cookies();
  // console.log(myCookies);
  // console.log("Srevice Page");
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
            <Link href="/services" className="nav-link active">
              Services
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Our Services</h1>
        <ul className="services-list">
          <li>Web Development</li>
          <li>Mobile App Development</li>
          <li>Consulting Services</li>
          <li>Digital Marketing</li>
        </ul>
      </div>
    </>
  );
};

export default Services;
