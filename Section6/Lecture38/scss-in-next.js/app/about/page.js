"use client";

import { useState } from "react";

const About = () => {
  const [fruits, setFruits] = useState(["Apple", "Banana", "Mango"]);
  return (
    <>
      <div>
        <h1>About Us</h1>
        <p>We are a company dedicated to providing quality services.</p>
        <button
          onClick={() => {
            // console.log(object);
            setFruits(null);
          }}
        >
          Click Me
        </button>
        <div>
          {fruits.map((fruit, id) => (
            <p key={id}>{fruit}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
