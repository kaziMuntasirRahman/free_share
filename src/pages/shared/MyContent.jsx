const MyContent = () => {
  return (
    <div>
      
    </div>
  );
};

export default MyContent;


import { useEffect, useState } from "react";
import ContentForm from "./ContentForm";
import Content from "./Content";

const Home = () => {

  const [contents, setContents] = useState([])

  useEffect(() => setContents(JSON.parse(localStorage.getItem('contents')) || []), [])

  // const handleDelete = async (index) => {
  //   const isConfirm = confirm("Do you want to delete this post?")
  //   if(!isConfirm) return;
  //   let storedContent = JSON.parse(localStorage.getItem('contents'))
  //   storedContent.splice(index, 1)
  //   setContents(storedContent)
  //   localStorage.setItem('contents', JSON.stringify(storedContent))
  // }

  return (
    <div>
      <p>This is Home Page.</p>

      <ContentForm contents={contents} setContents={setContents} />

      <p className="text-lg my-3">total content available: {contents.length}</p>
      <div className="flex flex-wrap justify-between ">
        {
          // Array(10).fill().map((content, index) =>
          contents.map((content, index) =>
            <Content key={content._id} content={content} index={index} />
            // <section className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8 relative">
            //   <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            //     Title: {content.title}
            //   </h2>
            //   <p className="text-gray-600 mb-6">
            //     Description: {content.description}
            //   </p>
            //   <img
            //     src={content.image}
            //     alt="Image"
            //     className="w-full h-auto rounded-md shadow-md"
            //   />
            //   <button onClick={() => handleDelete(index)} className="absolute top-5 right-5 text-base bg-red-500/60 hover:bg-red-500 text-white px-2 rounded-xs cursor-pointer">X</button>
            // </section>
          )
        }
      </div>
    </div>
  );
};