import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutAPI from "../../api/Logout";
import { FiEye, FiEyeOff, FiChevronsLeft } from "react-icons/fi";
import UpdateUserAPI from "../../api/UpdateUser";

const ChangePassword = (props) => {
  const navigate = useNavigate();
  const [isShowPass2, setIsShowPass2] = useState(true);
  const [isShowPass3, setIsShowPass3] = useState(true);
  const { handlePasswordDrawer, passwordDrawer, UserID } = props;
  const [errors, setErrors] = useState({
    newpassword: "",
    repassword: "",
  });
  const [form, setForm] = useState({
    newpassword: "",
    repassword: "",
  });
  const handleChangePassword = async (e) => {
    e.preventDefault();
    // console.log(UserID);
    if (form.newpassword !== form.repassword) {
      setErrors({ ...errors, repassword: "password not match" });
      alert("Passwords does not match");
    } else {
      await UpdateUserAPI(UserID, { password: form.newpassword });
      //   console.log(res);
      alert("Changed password");
      const res2 = await LogoutAPI(UserID);
      if (res2.status === 200) {
        localStorage.removeItem("access_token");
        navigate("/sign", { replace: true });
      }
    }
  };

  const handlePassword = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div
        className={`z-10 absolute backdrop-blur bg-[rgba(0,0,0,0.6)] w-[100vw] h-[100vh] ${
          passwordDrawer ? "block" : "hidden"
        }`}
        onClick={() => {
          handlePasswordDrawer();
        }}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <>
          <label className="absolute text-white z-30 text-[30px] font-bold -top-[220px]">
            Change Password
          </label>
          <form
            onSubmit={handleChangePassword}
            className={`z-20 text-center rounded-[10px] border-[2px] backdrop-blur-[8px] border-[rgba(255,255,255,1)] pt-[20px] pb-[40px] duration-300 ${
              passwordDrawer ? "block" : "hidden"
            }`}
          >
            <div className="w-[20px] h-[70px]"></div>
            <div className="absolute right-[-5px] top-[-5px]">
              <div
                onClick={() => {
                  handlePasswordDrawer();
                }}
                className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                  passwordDrawer ? "block" : "hidden"
                }`}
              >
                <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
              </div>
            </div>
            <div className="px-10 py-10">
              <div className="relative ">
                <div className="relative ">
                  <input
                    type={isShowPass2 ? "password" : "text"}
                    id="newpassword"
                    name="newpassword"
                    onChange={handlePassword}
                    value={form.newpassword}
                    required
                    className="mt-12 w-[350px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  />
                  <label
                    htmlFor="newpassword"
                    className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-5 scale-110 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-3 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-2 peer-valid:left-4 peer-valid:scale-90 peer-valid:top-20`}
                  >
                    new password
                  </label>
                </div>
                {isShowPass2 ? (
                  <FiEyeOff
                    onClick={() => setIsShowPass2(!isShowPass2)}
                    className="absolute top-16 right-6 text-[#fff]"
                  />
                ) : (
                  <FiEye
                    onClick={() => setIsShowPass2(!isShowPass2)}
                    className="absolute top-16 right-6 text-[#fff]"
                  />
                )}
              </div>
              <div className="relative ">
                <div className="relative ">
                  <input
                    type={isShowPass3 ? "password" : "text"}
                    id="repassword"
                    name="repassword"
                    onChange={handlePassword}
                    value={form.repassword}
                    required
                    className="mt-12 w-[350px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  />
                  <label
                    htmlFor="repassword"
                    className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-5 scale-110 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-3 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-2 peer-valid:left-4 peer-valid:scale-90 peer-valid:top-20`}
                  >
                    re-new password
                  </label>
                </div>
                {isShowPass3 ? (
                  <FiEyeOff
                    onClick={() => setIsShowPass3(!isShowPass3)}
                    className="absolute top-16 right-6 text-[#fff]"
                  />
                ) : (
                  <FiEye
                    onClick={() => setIsShowPass3(!isShowPass3)}
                    className="absolute top-16 right-6 text-[#fff]"
                  />
                )}
              </div>
              <div></div>
              <button className="duration-300 mt-[100px] w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:scale-105">
                Update
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default ChangePassword;
