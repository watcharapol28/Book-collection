import { React, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoginAPI from "../../api/Login";
import "../../styles/Sign.css";
import { useNavigate } from "react-router-dom";
// import { getAcessToken } from "../../helper/getToken";

const Login = () => {
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await LoginAPI(form);
    if (res.status === 200) {
      // alert("Login success!");
      localStorage.setItem("access_token", res.data.token);
      // console.log(res.data.token);
      // window.location.href = "/";
      navigate("/", { replace: true });
      return res.data.token;
    } else {
      alert("Username or password incorrect");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" relative border-[2px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] pt-[20px] pb-[40px] duration-300"
    >
      <div className="relative ">
        <div className="relative ">
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleLogin}
            required
            className=" mt-12 w-[350px] px-4 py-2 pr-16 peer outline-none bg-transparent border-b-[1px] text-white"
          />
          <label
            htmlFor="username"
            className={
              "text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-24 scale-100 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-16 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-3 peer-valid:left-16 peer-valid:scale-90 peer-valid:top-20"
            }
          >
            Username
          </label>
        </div>
        <PersonIcon className="absolute right-24 top-14 text-white" />
      </div>
      <div className="relative ">
        <div className="relative ">
          <input
            type={isShowPass ? "password" : "text"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleLogin}
            required
            className="mt-12 w-[350px] px-4 py-2 pr-16 peer outline-none bg-transparent border-b-[1px] text-white"
          />
          <label
            htmlFor="password"
            className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-24 scale-100 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-16 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-3 peer-valid:left-16 peer-valid:scale-90 peer-valid:top-20`}
          >
            Password
          </label>
        </div>
        {isShowPass ? (
          <FiEyeOff
            onClick={() => setIsShowPass(!isShowPass)}
            className="absolute top-16 right-24 text-[#fff]"
          />
        ) : (
          <FiEye
            onClick={() => setIsShowPass(!isShowPass)}
            className="absolute top-16 right-24 text-[#fff]"
          />
        )}
      </div>
      <div>
        <button className="duration-300 mt-[100px] w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:scale-105">
          Login
        </button>
      </div>
      <div className=" mt-[60px] text-[#fff] hover:text-line hover:cursor-pointer w-[180px] mx-auto underline hover:text-[#6ea8ff]">
        {/* <input type="checkbox" /> */}
        Forgot your password?
      </div>
    </form>
  );
};

export default Login;
