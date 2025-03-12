import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import useAxiosPublic from "./useAxiosPublic";

const useGetConversation = () => {
  const { user } = useContext(FirebaseContext)
  const axiosPublic = useAxiosPublic()


  const { data: conversation = {}, isLoading, refetch } = useQuery({
    queryKey: ['conversations', user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(`conversations/${user.email}`)
      return response.data;
    },
    enabled: !!user?.email, // Prevent query from running if email is undefined
  })

  // console.log(conversation)

  return { conversation, isLoading, refetch };
};

export default useGetConversation;