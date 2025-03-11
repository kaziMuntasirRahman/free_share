import axios from "axios";

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000/'
  // baseURL: 'http://localhost:5000/'
  // baseURL: 'https://free-share-server.vercel.app/'
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;