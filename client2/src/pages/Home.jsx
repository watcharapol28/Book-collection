import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import CollectionBooks from "../components/Home/CollectionBooks";
// import "../../styles/Home.css";
import { getAcessToken } from "../helper/getToken";
import Onload from "../components/Home/Onload";
import backGround from "../assets/books.jpg";

const Home = () => {
  // const [islogin, setIsLogin] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [isMyCollection, setIsMyCollection] = useState(false);
  const [isMyFavorites, setIsMyFavorites] = useState(false);
  const [isOnload, setIsOnload] = useState(false);
  const navigate = useNavigate();
  const handleMyCollection = () => {
    setIsMyCollection(true);
    setIsMyFavorites(false);
    setIsHome(false);
  };
  const handleHome = () => {
    setIsMyCollection(false);
    setIsMyFavorites(false);
    setIsHome(true);
  };
  const handleMyFavorites = () => {
    setIsMyCollection(false);
    setIsMyFavorites(true);
    setIsHome(false);
  };
  useEffect(() => {
    const token = getAcessToken();
    // console.log(token);
    if (token === "") {
      navigate("/sign");
    }
  });

  return (
    <div className="">
      {isOnload ? <Onload /> : ""}

      <div>
        <div className="bg-cover w-[100%] h-[100%] blur absolute z-[-1]">
          <img src={backGround} className="w-full h-full" />
        </div>
      </div>
      <Navbar
        handleMyCollection={handleMyCollection}
        handleMyFavorites={handleMyFavorites}
        handleHome={handleHome}
      />
      <CollectionBooks
        isHome={isHome}
        handleHome={handleHome}
        isMyCollection={isMyCollection}
        isMyFavorites={isMyFavorites}
        setIsOnload={setIsOnload}
      />
      {/* {isHome ? <CollectionBooks /> : <></>} */}
      {/* {isMyCollection ? <></> : <></>}
      {isMyFavorites ? <></> : <></>} */}
    </div>
  );
};

export default Home;
