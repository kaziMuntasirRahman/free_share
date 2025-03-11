import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  const { user } = useContext(FirebaseContext)
  const axiosPublic = useAxiosPublic()

  const { data: userInfo = {}, isLoading, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await axiosPublic.get(`users/${user?.email}`)
      return response.data;
    }
  })

  return [userInfo, isLoading, refetch];
};

export default useGetUser;