import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Modal = () => {
  const [signin, setSignin] = useState(true);
  return (
    <div className="pt-[7%] w-[500px] mx-auto pb-auto]">
      {signin ? (
        <div className="flex justify-center">
          <div
            className="text-white w-[250px] h-[80px] border-[1px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] bg-transparent cursor-pointer text-[40px] font-bold border-b-[10px]"
            onClick={() => setSignin(true)}
          >
            Login
          </div>
          <div
            className="w-[250px] h-[60px] pt-[10px] mt-[20px] border-[1px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] bg-transparent cursor-pointer text-[25px] font-meduim text-[#e6e6e6]"
            onClick={() => setSignin(false)}
          >
            Register
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            className="w-[250px] h-[60px] mt-[20px] border-[1px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] cursor-pointer pt-[10px] bg-transparent text-[25px] font-meduim text-[#e6e6e6]"
            onClick={() => setSignin(true)}
          >
            Login
          </div>
          <div
            className="w-[250px] h-[80px] border-[1px] backdrop-blur-[8px] border-[rgba(255,255,255,0.5)] cursor-pointer bg-transparent text-[40px] font-bold text-white border-b-[10px]"
            onClick={() => setSignin(false)}
          >
            Register
          </div>
        </div>
      )}
      <div className="mx-auto max-h-[800px] max-w-[500px] bg-transparent">
        {signin ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default Modal;
