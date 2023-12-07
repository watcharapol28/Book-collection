import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const CreateRequestAPI = async (collectionName, collectionBuff, books) => {
  //   const { user_id, book_id } = data;
  // console.log(collection);
  const res = await axios
    .post("/request/", {
      collectionName: collectionName,
      collectionBuff: collectionBuff,
      books,
    })
    .catch((err) => err);
  //   console.log(data);

  return res.data;
};

export default CreateRequestAPI;
