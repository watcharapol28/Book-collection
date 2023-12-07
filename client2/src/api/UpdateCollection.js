import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const UpdateCollectionAPI = async (data) => {
  //   const { user_id, book_id } = data;

  const res = await axios.patch("/collection/" + data.id.).catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default UpdateCollectionAPI;
