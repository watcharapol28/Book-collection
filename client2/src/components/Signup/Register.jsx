import { React, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { FiEye, FiEyeOff } from "react-icons/fi";
import validateEmail from "../../helper/validateEmail";
import EmailIcon from "@mui/icons-material/Email";
import "../../styles/Sign.css";
import RegisterAPI from "../../api/Register";
// import { useNavigate } from "react-router-dom";

const Register = (props) => {
  // const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [isShowRepass, setIsShowRepass] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleRegister = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);

    if (!form.username) {
      setErrors({ ...errors, username: "name is required" });
      alert("Username is required");
    } else if (!form.email) {
      setErrors({ ...errors, email: "email is required" });
      alert("Email is required");
    } else if (!validateEmail(form.email)) {
      setErrors({ ...errors, email: "please check your email" });
      alert("Please check your email");
    } else if (!form.password) {
      setErrors({ ...errors, password: "password is required" });
      alert("Password is required");
    } else if (form.password.length < 5 || form.password.length > 20) {
      setErrors({ ...errors, password: "password is must be 5-20 charecters" });
      alert("Password is must be 5-20 charecters");
    } else if (form.password !== form.repassword) {
      setErrors({ ...errors, repassword: "password not match" });
      alert("Passwords does not match");
    } else {
      const res = await RegisterAPI({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // console.log(form);
      if (res.status === 201) {
        alert("Register success!");
        window.location.reload();
        // navigate("/sign", { replace: true });
        //return to modal set to login
        // console.log(res.data.token);
      } else {
        alert("Username or Email already exists");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative border-[2px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] pt-[20px] pb-[40px]"
    >
      <div className="relative ">
        <div className="relative">
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleRegister}
            required
            className=" mt-12 w-[350px] px-4 py-2 pr-16 peer outline-none bg-transparent border-b-[1px] text-white"
          />
          <label
            htmlFor="username"
            className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-24 scale-100 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-16 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-3 peer-valid:left-16 peer-valid:scale-90 peer-valid:top-20`}
          >
            Username
          </label>
        </div>
        <PersonIcon className="absolute right-24 top-14 text-[#fff]" />
      </div>
      <div className="relative ">
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleRegister}
            required
            className="mt-12 w-[350px] px-4 py-2 pr-16 peer outline-none bg-transparent border-b-[1px] text-white"
          />
          <label
            htmlFor="email"
            className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-24 scale-100 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-16 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-3 peer-valid:left-16 peer-valid:scale-90 peer-valid:top-20`}
          >
            Email
          </label>
        </div>
        <EmailIcon className="absolute right-24 top-14 text-[#fff]" />
      </div>
      <div className="relative">
        <div className="relative">
          <input
            type={isShowPass ? "password" : "text"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleRegister}
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
      <div className="relative">
        <div className="relative">
          <input
            type={isShowRepass ? "password" : "text"}
            id="repassword"
            name="repassword"
            value={form.repassword}
            onChange={handleRegister}
            required
            className="mt-12 w-[350px] px-4 py-2 pr-16 peer outline-none bg-transparent border-b-[1px] text-white"
          />
          <label
            htmlFor="repassword"
            className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-24 scale-100 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-16 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-3 peer-valid:left-16 peer-valid:scale-90 peer-valid:top-20`}
          >
            Re-password
          </label>
        </div>
        {isShowRepass ? (
          <FiEyeOff
            onClick={() => setIsShowRepass(!isShowRepass)}
            className="absolute top-16 right-24 text-[#fff]"
          />
        ) : (
          <FiEye
            onClick={() => setIsShowRepass(!isShowRepass)}
            className="absolute top-16 right-24 text-[#fff]"
          />
        )}
      </div>
      <div className=" pl-[10px] flex ml-[76px] mt-[40px] text-[#fff]">
        <input type="checkbox" className="mr-[10px]" />
        Agree term of services
      </div>
      <div>
        <button className="duration-300 mt-[50px] w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:scale-105">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
