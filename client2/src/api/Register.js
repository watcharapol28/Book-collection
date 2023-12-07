import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const RegisterAPI = async (form) => {
  const { username, email, password } = form;

  const res = await axios
    .post("/user/register", { username, email, password })
    .catch((err) => err);

  // console.log(res);
  return res;
};

export default RegisterAPI;
