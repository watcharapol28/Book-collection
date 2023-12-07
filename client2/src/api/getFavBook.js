import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const getFavAPI = async (data) => {
  //   console.log(data);
  const res = await axios.get("/fav/" + data).catch((err) => err);

  return res.data;
};

export default getFavAPI;
