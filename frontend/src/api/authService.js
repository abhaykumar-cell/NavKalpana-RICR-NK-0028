import axiosInstance from "./axiosInstance";

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email,
    password,
  });
 
  

  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post("/auth/refresh", {
    refreshToken,
  });

  return response.data;
};