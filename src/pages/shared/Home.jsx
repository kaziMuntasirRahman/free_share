import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

  const [contents, setContents] = useState([])

  useEffect(() => setContents(JSON.parse(localStorage.getItem('contents')) || []), [])



  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    image: null
  })

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    const { title, description, image } = newContent;
    // console.log(newContent);
    // console.log(JSON.parse(localStorage.getItem('contents')))

    const imageFile = { image: image }; // Wrap the image file
    if (!title && !description && !image) {
      return alert("Please Enter your story or image.")
    }

    // if (!image) return;
    try {
      if (!image) {
        return setContents([...contents, newContent])
      }

      const res = await axios.post(imgbb_api_url, imageFile, {
        headers: {
          "content-type": "multipart/form-data", // Ensure the file is uploaded correctly
        },
      })

      // console.log(res.data);
      if (res.data.status) {
        alert("Your content has been saved.")

        setContents([...contents, { title, description, image: res.data.data.url }])
        localStorage.setItem('contents', JSON.stringify([...contents, { title, description, image: res.data.data.url }]))
      } else {
        alert("Failed to save content.")
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      e.target.reset();
    }
  }

  const handleDelete = async (index) => {
    let storedContent = JSON.parse(localStorage.getItem('contents'))
    storedContent.splice(index, 1)
    setContents(storedContent)
    localStorage.setItem('contents', JSON.stringify(storedContent))
  }

  return (
    <div>
      <p>This is Home Page.</p>
      <form onSubmit={handleContentSubmit} className="flex flex-col w-2xs gap-3">
        <p>upload content</p>
        <input onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} type="text" className="input" placeholder="story title" />
        <textarea onChange={(e) => setNewContent({ ...newContent, description: e.target.value })} type="text" className="textarea" placeholder="write your story" />
        <input onChange={(e) => setNewContent({ ...newContent, image: e.target.files[0] })} type="file" className="file-input file-input-neutral" />
        <button className="btn">submit</button>
      </form>

        <p className="text-lg my-3">total content available: {contents.length}</p>
      <div className="flex flex-wrap justify-between border">
        {
          // Array(10).fill().map((content, index) =>
          contents.map((content, index) =>
            <section className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8 relative">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Title: {content.title}
              </h2>
              <p className="text-gray-600 mb-6">
                Description: {content.description}
              </p>
              <img
                src={content.image}
                alt="Image"
                className="w-full h-auto rounded-md shadow-md"
              />
              <button onClick={() => handleDelete(index)} className="absolute top-5 right-5 text-base bg-red-500/60 hover:bg-red-500 text-white px-2 rounded-xs cursor-pointer">X</button>
            </section>
          )
        }
      </div>
    </div>
  );
};

export default Home;