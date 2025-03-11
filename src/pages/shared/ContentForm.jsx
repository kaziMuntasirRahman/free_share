import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FirebaseContext } from "../../providers/FirebaseProvider";

const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;

const ContentForm = ({ contents, setContents }) => {
  const { user } = useContext(FirebaseContext)
  const axiosPublic = useAxiosPublic()

  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    image: null,
    isPublic: false,
    isAnonymous: false
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setNewContent({
      ...newContent.uploader,
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL
    })

  }, [])



  const handleContentSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const { title, description, image, uploader, isAnonymous, isPublic } = newContent;
    console.log(newContent);

    //return if the form is empty
    if (!title && !description && !image) {
      setIsLoading(false)
      return alert("Please Enter your story or image.")
    }

    let imgURL = '';
    // let uploader = { name: '', email: '', photo: '' }
    // if (!isAnonymous && user) {
    //   uploader = { name: user?.displayName, email: user?.email, photo: user?.photoURL }
    // }

    const imageFile = { image: image }; // Wrap the image file


    // if (!image) return;
    try {
      if (image) {
        const res = await axios.post(imgbb_api_url, imageFile, {
          headers: {
            "content-type": "multipart/form-data", // Ensure the file is uploaded correctly
          },
        })
        console.log(res.data);
        if (res.data.status) {
          imgURL = res.data.data.url;

        } else { // if the image failed to upload
          console.log("Failed to upload image.")
        }
        console.log(image, imgURL)
      }
      const dbResponse = await axiosPublic.post('contents', { title, description, imgURL, uploader, isPublic, isAnonymous })
      if (dbResponse.data.insertedId) {
        console.log(dbResponse.data)
        setContents([...contents, { title, description, image: imgURL }])
        localStorage.setItem('contents', JSON.stringify([...contents, { title, description, image: imgURL }]))
        alert("Your content has been saved.")
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      e.target.reset();
      setNewContent({ ...newContent, title: "", description: "", image: null, isPublic: false, isAnonymous: false })
      setIsLoading(false)
    }
  }



  return (
    <div>
      {isLoading && <div className="h-full w-full bg-slate-500/60 absolute top-0 left-0 flex items-center justify-center z-50 " >
        <span className="loading loading-lg loading-dots scale-200 text-white" />
      </div>}
      <form onSubmit={handleContentSubmit} className="flex flex-col w-2xs gap-3 p-5 mx-auto border border-black/20">
        <p>upload content</p>
        <input
          onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
          type="text"
          className="focus:outline-none input"
          placeholder="story title" />
        <textarea
          rows={4}
          onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
          type="text"
          className="focus:outline-none textarea"
          placeholder="write your story" />
        <input
          onChange={(e) => setNewContent({ ...newContent, image: e.target.files[0] })}
          type="file"
          className="file-input file-input-neutral focus:outline-none focus:border-[2px]" />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newContent.isPublic}
            onChange={() => setNewContent({ ...newContent, isPublic: !newContent.isPublic })}
            className="checkbox"
          />
          <p>Publish as Public.</p>
        </div>
        {/* is anonymous */}
        {
          user?.email &&
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newContent.isAnonymous}
              onChange={() => setNewContent({ ...newContent, isAnonymous: !newContent.isAnonymous })}
              className="checkbox"
            />
            <p>Anonymous Post.</p>
          </div>
        }
        <button className="btn btn-info">submit</button>
      </form>
    </div>
  );
};

export default ContentForm;