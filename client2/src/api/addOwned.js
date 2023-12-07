import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const createOwnedAPI = async (data) => {
  //   const { user_id, book_id } = data;

  const res = await axios
    .post("/owned/" + data.bookId, { user_id: data.UserID })
    .catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default createOwnedAPI;
