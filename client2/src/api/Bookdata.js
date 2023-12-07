import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const BookDataAPI = async (BookId) => {
  //   const { username, password } = form;

  const res = await axios.get("/book/" + BookId).catch((err) => err);

  // console.log(res.data);
  return res.data;
};

export default BookDataAPI;
