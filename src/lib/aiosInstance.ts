import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  const token =
    typeof document !== "undefined"
      ? document.cookie
          .split("; ")
          .find((r) => r.startsWith("token="))
          ?.split("=")[1]
      : null;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
