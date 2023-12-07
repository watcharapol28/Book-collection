import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const UpdateUserAPI = async (UserID, newpassword) => {
  //   console.log("TEST : " + newpassword);
  const res = await axios
    .patch("/user/" + UserID, newpassword)
    .catch((err) => err);

  return res.data;
};

export default UpdateUserAPI;
