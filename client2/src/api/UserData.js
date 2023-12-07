import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const UserDataAPI = async (userId) => {
  const res = await axios.get("/user/" + userId).catch((err) => err);
  // console.log(res.data.message);
  return res.data.message;
};

export default UserDataAPI;
