import { useEffect, useState } from "react";
import ContentForm from "./ContentForm";

const Home = () => {

  const [contents, setContents] = useState([])

  useEffect(() => setContents(JSON.parse(localStorage.getItem('contents')) || []), [])

  return (
    <div>
      <h1 className="text-center text-6xl mb-10">Welcome to Free Share.</h1>
      <ContentForm contents={contents} setContents={setContents} />
    </div>
  );
};

export default Home;