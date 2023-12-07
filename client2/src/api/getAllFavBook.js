import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const getAllFavAPI = async (data) => {
  //   console.log(data);
  const res = await axios.get("/fav/all/" + data).catch((err) => err);

  return res.data;
};

export default getAllFavAPI;
