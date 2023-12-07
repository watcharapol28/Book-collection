import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const LogoutAPI = async (userId) => {
  // const { userId } = form;
  // console.log(userId);
  const res = await axios.post("/user/logout/" + userId).catch((err) => err);

  // console.log(res);
  return res;
};

export default LogoutAPI;
