import axios from "axios";
import { SERVER_BASE_URL } from "./Default";

axios.defaults.baseURL = SERVER_BASE_URL;

const UpdateProfileAPI = async (
  UserID,
  // form
  { firstname, lastname, sex, dateOfBirth, buff }
) => {
  const res = await axios
    .patch(
      "/user/" + UserID,
      {
        firstname: firstname,
        lastname: lastname,
        sex: sex,
        dateOfBirth: dateOfBirth,
        buff: buff,
      }
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    )
    .catch((err) => err);

  // console.log(res.data);
  return res;
};

export default UpdateProfileAPI;
