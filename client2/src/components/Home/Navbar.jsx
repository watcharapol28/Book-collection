import { React, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
// import imageProfile from "../../assets/books.jpg";
import imageLogo from "../../assets/logo.png";
import Drawer from "./Drawer";
import { getAcessToken } from "../../helper/getToken";
import UserDataAPI from "../../api/UserData";
import { BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  if (token !== "") {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}

const Navbar = (props) => {
  const navigate = useNavigate();
  const { handleMyCollection, handleMyFavorites, handleHome } = props;
  const [isDrawer, setIsDrawer] = useState(false);
  const [role, setRole] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userName, setUsername] = useState("");
  const token = getAcessToken();
  const UserID = token === "" ? "" : parseJwt(token).userId;
  useEffect(() => {
    if (token !== "") {
      async function getUser() {
        const res = await UserDataAPI(UserID);
        setRole(res.role);
        setUsername(res.username);
        setUserImage(res.buff);
      }
      getUser();
    }
  });

  function handleDrawer() {
    setIsDrawer(!isDrawer);
    // handleHome();
  }

  return (
    <>
      <div className="flex bg-transpent backdrop-brightness-200 border-b-[1px] border-[rgba(0,0,0,0.1)] bg-[rgba(0,0,0,0.5)]  backdrop-blur-[10px] h-[100px] w-full">
        <div
          onClick={() => {
            setIsDrawer(false);
            navigate("/", { replace: true });
          }}
          className="cursor-pointer absolute left-7 top-5 w-[60px] h-[60px] bg-cover"
          style={{
            backgroundImage: `url(${imageLogo})`,
          }}
        ></div>
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="peer pr-3 text-[20px] pl-[40px] absolute mt-1.5 left-[120px] w-[30vw] max-w-[500px] top-6 min-w-[250px] min-h-[40px] outline-none bg-transparent border-b-[1px] text-white"
        />
        <FiSearch className="absolute left-[130px] w-[20px] h-[20px] top-10 text-white peer-focus:scale-125" />
        {isDrawer ? (
          <Drawer
            handleDrawer={handleDrawer}
            isDrawer={isDrawer}
            userName={userName}
            UserID={UserID}
            role={role}
            userImage={userImage}
            handleMyCollection={handleMyCollection}
            handleMyFavorites={handleMyFavorites}
            // setIsOnload={setIsOnload}
          />
        ) : (
          <BsList
            className="hover:bg-[rgba(255,255,255,0.3)] transition duration-500 ease-in-out absolute right-5 top-3 w-[70px] h-[70px] rounded-[100%] bg-transpent cursor-pointer text-white"
            onClick={() => {
              handleDrawer();
              handleHome();
            }}
          />
        )}
      </div>
    </>
  );
};

export default Navbar;
