import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:4040/'
  baseURL: 'https://free-share-server.vercel.app/'
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;