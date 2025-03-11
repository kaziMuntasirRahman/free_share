import { useEffect, useState } from "react";
import Content from "./Content";

const MyContents = () => {
  const [contents, setContents] = useState([])

  useEffect(() => setContents(JSON.parse(localStorage.getItem('contents')) || []), [])
  return (
      <div>
        <p className="text-lg my-3">total content available: {contents.length}</p>
        <div className="flex flex-wrap justify-between ">
          {
            // Array(10).fill().map((content, index) =>
            contents.map((content, index) =>
              <Content key={content._id} content={content} index={index} />
            )
          }
        </div>
      </div>
  );
};

export default MyContents;


