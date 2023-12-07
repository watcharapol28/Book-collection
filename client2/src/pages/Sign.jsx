import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Signup/Modal";
import imageBg from "../assets/books.jpg";
import { getAcessToken } from "../helper/getToken";

const Sign = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAcessToken();
    // console.log(token);
    if (token !== "") {
      navigate("/");
    }
  });
  return (
    <div className="text-center">
      <div>
        <div
          className=" blur-[5px] bg-cover w-[100%] h-[100%] absolute z-[-1]"
          style={{
            backgroundImage: `url(${imageBg})`,
          }}
        ></div>
      </div>
      <Modal className="relative z-[1]" />
    </div>
  );
};

export default Sign;
