import { IoMdShareAlt } from "react-icons/io";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { FirebaseContext } from "../../providers/FirebaseProvider";

const Content = ({ content, index, myPost = false }) => {
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(FirebaseContext)

  const handleShare = async (content) => {
    // console.log(content)
    const receiver = prompt("Enter receiver email. \nContent will be sent even if the user doesn't exist. He/she will get the message after he creates an account.")
    if (!receiver) return;
    // console.log(receiver)

    // Email validation using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email is valid
    if (!emailPattern.test(receiver)) {
      return alert("Please enter a valid email address.");
    }
    const sender = user?.email;
    let isAnonymous = true;
    if (!sender) {
      isAnonymous = true
    }

    try {
      const res = await axiosPublic.post('conversations', { content, sender, receiver, isAnonymous })
      if (res.data.insertedId) {
        alert("Your message has been sent.")
      }
    } catch (err) {
      console.log(err)
      alert("Oops, Couldn't sent content. Please try again later.")
    }


  }

  const { title, image, description, uploader, isAnonymous, isPublic, uploadTime, likedCount } = content;
  return (
    <div className="border border-gray-200 shadow-lg overflow-hidden relative h-[500px] w-[380px] mb-6 bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* content image */}
      <div className="w-full h-[260px] skeleton overflow-hidden rounded-none">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"
        />
      </div>

      <span className="absolute right-4 top-4 bg-black text-white font-bold text-sm px-3 py-1 ">{index + 1}</span>

      <div className="p-4 space-y-2">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

        {/* uploader info */}
        <div className="mt-3 flex items-center gap-2">
          {
            (isAnonymous || !uploader?.email) ?
              <div className="avatar avatar-placeholder tooltip tooltip-right" data-tip="Anonymous">
                <div className="bg-neutral text-neutral-content w-8 rounded-full " >
                  <button className="text-xs" >A</button>
                </div>
              </div> :
              <img
                src={uploader?.photo}
                alt={uploader?.name}
                className="w-8 h-8 rounded-full border border-gray-300"
              />
          }
          <div>
            <p className="text-gray-800 text-sm font-medium">{isAnonymous ? 'Anonymous' : uploader?.name}</p>
            {
              myPost ||
              <p className="text-gray-500 text-xs">{isAnonymous ? '' : uploader?.email}</p>
            }
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">
            {new Date(uploadTime).toLocaleDateString()} • {isPublic ? "Public" : "Private"}
          </p>
        </div>
      </div>
      <div className="absolute w-full bottom-0 left-0 flex   text-white">
        <div className="flex items-center justify-center gap-1 w-1/2 border-r border-white bg-gray-400  hover:bg-gray-700 transition-all ease-in duration-150 py-1">
          <span className="text-lg mr-1">{likedCount?.length}</span>
          {/* <span className="">{isLiked ? 1 : 0}</span> */}
          <label className="swap swap-flip text-lg">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />
            {/* <input type="checkbox" checked={isLiked} onChange={(event) => setIsLiked(event.target.checked)} /> */}
            <div className='swap-on text-gray-50'>❤</div>
            <div className='swap-off '>🤍</div>
          </label>
          {/* <p>value if is liked: {isLiked?"liked":"not Liked"}</p> */}
        </div>
        <button
          onClick={() => handleShare(content)}
          className="w-1/2 flex items-center justify-center cursor-pointer bg-gray-400 hover:bg-gray-700 transition-all ease-in duration-150 text-xl tooltip" data-tip="Share">
          <IoMdShareAlt />
        </button>
      </div>
    </div>
  );
};

export default Content;