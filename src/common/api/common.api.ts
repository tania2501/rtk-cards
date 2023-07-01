import axios from "axios";
import globalRouter from "../utils/globalRouter";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && globalRouter.navigate) {
      globalRouter.navigate("/login");
    }
    return Promise.reject(error);
  }
);
export default instance;