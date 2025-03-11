const Content = ({ content, index }) => {

  const handleShare = (content) => {
    console.log(content)
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
            <p className="text-gray-500 text-xs">{isAnonymous ? '' : uploader?.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">
            {new Date(uploadTime).toLocaleDateString()} • {isPublic ? "Public" : "Private"}
          </p>
        </div>
      </div>
      <div className="absolute w-full bottom-0 left-0 flex bg-gray-400 text-white">
        <div className="flex items-center justify-center gap-1 w-1/2 border-r border-white py-1">
          <span className="text-lg mr-1">{likedCount.length}</span>
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
          className="w-1/2 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all ease-in duration-150">
          share
        </button>
      </div>
    </div>
  );
};

export default Content;