import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const removeOwnedAPI = async (data) => {
  //   const { user_id, book_id } = data;

  const res = await axios
    .delete("/owned/" + data.bookId, { data: { user_id: data.UserID } })
    .catch((err) => err);
  //   console.log(data.UserID);

  return res.data;
};

export default removeOwnedAPI;
