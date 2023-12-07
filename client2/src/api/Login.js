import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const LoginAPI = async (form) => {
  const { username, password } = form;

  const res = await axios
    .post("/user/login", { username, password })
    .catch((err) => err);

  // console.log(res);
  return res;
};

export default LoginAPI;
