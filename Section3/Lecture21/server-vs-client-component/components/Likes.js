import { useState } from "react";

export default function Likes() {
  let [likes, setLikes] = useState(0);
  return <div onClick={() => setLikes(likes + 1)}>Likes {likes}</div>;
}
