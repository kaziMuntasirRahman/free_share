import { useQuery } from "@tanstack/react-query";

const AllPublicContent = () => {

  // fetching data using tanstack query
  const { data: contents = [], isLoading, refetch } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const res = await fetch('/data/data.json')
      return res.json()
    }
  })

  return (
    <div>
      <div className="flex flex-wrap justify-between">
        {
          contents.map((content, index) =>
            <div key={content} className="border border-black/15 pb-1 relative h-[450px] w-[380px] mb-4">
              <div className="w-full h-[260px] skeleton overflow-hidden rounded-lg">
                <img src={content.image} className="w-full h-full mb-2 object-cover hover:scale-125 transition-all duration-200 delay-150 ease-in-out" />
                {/* <img src={`https://picsum.photos/seed/${index + 1}/600/400`} className="w-full mb-2" /> */}
              </div>

              <span className="absolute right-5 top-5 bg-white text-black font-bold text-lg px-4 py-1">{index + 1}</span>
              <div className="p-2">
                <h1 className="text-lg font-bold mb-1">{content.heading}</h1>
                <p className="text-sm">{content.paragraph}</p>
              </div>
            </div>
          )
        }
      </div>

    </div>
  );
};

export default AllPublicContent;