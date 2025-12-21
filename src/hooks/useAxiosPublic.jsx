import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "https://hr-asset-verse-server.vercel.app",
});

const useaxiosPublic = () => {
  return axiosInstance;
};

export default useaxiosPublic;
