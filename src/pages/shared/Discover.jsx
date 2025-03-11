import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Content from "./Content";
// import { useState } from "react";

const Discover = () => {
  const axiosPublic = useAxiosPublic();

  // const [isLiked, setIsLiked] = useState(true)

  // fetching data using tanstack query
  // const { data: contents = [], isLoading, refetch } = useQuery({
  const { data: contents = [] } = useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const res = await axiosPublic.get('contents')
      return res.data
    }
  })


  return (
    <div className="">
      {/* <img src={`https://picsum.photos/seed/${index + 1}/600/400`} className="w-full mb-2" /> */}
      <div className="flex flex-wrap justify-evenly ">
        {
          contents.map((content, index) => <Content key={content._id} content={content} index={index} />)
        }
      </div>

    </div>
  );
};

export default Discover;