import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const GetRequestAPI = async () => {
  //   const { user_id, book_id } = data;
  //   console.log(books);
  const res = await axios.get("/request/").catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default GetRequestAPI;
