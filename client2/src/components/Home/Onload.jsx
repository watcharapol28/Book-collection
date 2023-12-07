import React from "react";
import Kuru from "../../assets/kuru.gif";
import Loadd from "../../assets/giphy.gif";

const Onload = () => {
  return (
    <div className="z-[60] pt-[25vh] absolute w-full h-full flex justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="absolute mx-auto">
        <img src={Kuru} className="" />
        <img src={Loadd} className="mx-auto" />
      </div>
    </div>
  );
};

export default Onload;
