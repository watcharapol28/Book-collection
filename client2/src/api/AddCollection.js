import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const AddCollectionAPI = async (data) => {
  //   const { user_id, book_id } = data;

  const res = await axios
    .post("/collection/", { name: data.name, buff: data.buff })
    .catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default AddCollectionAPI;
