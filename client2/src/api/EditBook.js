import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const AddBookDataAPI = async (bookId, data) => {
  //   const { username, password } = form;

  const res = await axios.patch("/book/" + bookId, data).catch((err) => err);
  console.log(res.data);
  return res.data;
};

export default AddBookDataAPI;

// export default ;
