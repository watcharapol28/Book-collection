import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const DeleteBookDataAPI = async (bookId) => {
  //   const { username, password } = form;

  const res = await axios.delete("/book/" + bookId).catch((err) => err);
  console.log(res.data);
  return res.data;
};

export default DeleteBookDataAPI;
