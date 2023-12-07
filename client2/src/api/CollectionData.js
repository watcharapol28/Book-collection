import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const CollectionDataAPI = async (str) => {
  //   const { username, password } = form;

  const res = await axios.get("/collection/" + str).catch((err) => err);

  // console.log(res.data);
  return res.data;
};

export default CollectionDataAPI;
