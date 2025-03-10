import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllPublicContent = () => {
  const axiosPublic = useAxiosPublic();

  // fetching data using tanstack query
  const { data: contents = [], isLoading, refetch } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const res = await axiosPublic.get('contents')
      return res.data
    }
  })

  console.log(isLoading, refetch)

  return (
    <div>
      {/* <img src={`https://picsum.photos/seed/${index + 1}/600/400`} className="w-full mb-2" /> */}
      <div className="flex flex-wrap justify-between">
        {
          contents.map((content, index) =>
            <div key={content.title} className="border border-gray-200 shadow-lg rounded-lg overflow-hidden relative h-[500px] w-[380px] mb-6 bg-white hover:shadow-2xl transition-shadow duration-300">
              <div className="w-full h-[260px] skeleton overflow-hidden">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out rounded-t-lg"
                />
              </div>

              <span className="absolute right-4 top-4 bg-black text-white font-bold text-sm px-3 py-1 rounded">{index + 1}</span>

              <div className="p-4 space-y-2">
                <h1 className="text-xl font-semibold text-gray-800">{content.title}</h1>
                <p className="text-gray-600 text-sm line-clamp-3">{content.description}</p>

                {/* uploader info */}
                <div className="mt-3 flex items-center gap-2">
                  {
                    content.isAnonymous ?
                      <div className="avatar avatar-placeholder tooltip tooltip-right" data-tip="Anonymous">
                        <div className="bg-neutral text-neutral-content w-8 rounded-full " >
                          <button className="text-xs" >UI</button>
                        </div>
                      </div> :
                      <img
                        src={content.uploader.photo}
                        alt={content.uploader.name}
                        className="w-8 h-8 rounded-full border border-gray-300"
                      />
                  }
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{content.uploader.name}</p>
                    <p className="text-gray-500 text-xs">{content.uploader.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-xs text-gray-400">
                    {new Date(content.uploadTime).toLocaleDateString()} • {content.isPublic ? "Public" : "Private"}
                  </p>

                  <div className="flex items-center gap-1">
                    <span className="text-red-500">{content.likedCount}</span>
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

          )
        }
      </div>

    </div>
  );
};

export default AllPublicContent;