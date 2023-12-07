import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const DeleteRequestAPI = async (reqId) => {
  //   const { user_id, book_id } = data;
  // console.log(collection);
  const res = await axios.delete("/request/" + reqId).catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default DeleteRequestAPI;
