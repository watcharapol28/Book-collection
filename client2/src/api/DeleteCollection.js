import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const DeleteCollectionAPI = async (data) => {
  //   const { user_id, book_id } = data;

  const res = await axios.delete("/collection/" + data).catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default DeleteCollectionAPI;
