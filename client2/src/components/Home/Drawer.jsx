import React, { useState } from "react";
import { FiChevronsRight } from "react-icons/fi";
import LogoutAPI from "../../api/Logout";
import { useNavigate } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import profileImageNewUser from "../../helper/profileNew";
import ShowProfile from "./ShowProfile";
import AddCollection from "./AddCollection";
import RequestAdd from "./RequestAdd";
import RequestList from "./RequestList";
// import RequestCollection from "./RequestCollection";

const Drawer = (props) => {
  const navigate = useNavigate();
  const {
    handleDrawer,
    isDrawer,
    userName,
    UserID,
    role,
    userImage,
    handleMyCollection,
    handleMyFavorites,
    // setIsOnload,
  } = props;
  // console.log(isHome, isMyCollection, isMyFavorites);
  const [isAddCollection, setIsAddCollection] = useState(false);
  const [isRequestAdd, setIsRequestAdd] = useState(false);
  const [isRequestList, setIsRequestList] = useState(false);
  const [passwordDrawer, setPasswordDrawer] = useState(false);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);
  function handlePasswordDrawer() {
    setPasswordDrawer(!passwordDrawer);
  }
  function handleProfileDrawer() {
    setProfileDrawer(!profileDrawer);
  }
  function handleRequestAdd() {
    setIsRequestAdd(!isRequestAdd);
  }
  function handleRequestList() {
    setIsRequestList(!isRequestList);
  }
  function handleShowProfileDrawer() {
    setShowProfileDrawer(!showProfileDrawer);
  }
  function handleAddCollection() {
    setIsAddCollection(!isAddCollection);
  }
  // const UserID = parseJwt(getAcessToken()).userId;
  // console.log(userImage);
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await LogoutAPI(UserID);
    // console.log(res.status);
    if (res.status === 200) {
      // alert("Logout success!");
      localStorage.removeItem("access_token");
      navigate("/sign", { replace: true });
    } else {
      // alert("TEST");
    }
  };
  // console.log(isAddCollection);
  // const [isDrawer, setIsDrawer] = useState(true);
  return (
    <>
      {showProfileDrawer ? (
        <ShowProfile
          handleShowProfileDrawer={handleShowProfileDrawer}
          showProfileDrawer={showProfileDrawer}
          UserID={UserID}
        />
      ) : (
        <></>
      )}
      {profileDrawer ? (
        <Profile
          handleProfileDrawer={handleProfileDrawer}
          profileDrawer={profileDrawer}
          UserID={UserID}
          userImage={userImage}
        />
      ) : (
        <></>
      )}
      {passwordDrawer ? (
        <ChangePassword
          handlePasswordDrawer={handlePasswordDrawer}
          passwordDrawer={passwordDrawer}
          UserID={UserID}
        />
      ) : (
        <></>
      )}
      {isAddCollection ? (
        <AddCollection
          isAddCollection={isAddCollection}
          handleAddCollection={handleAddCollection}
        />
      ) : (
        <></>
      )}
      {isRequestAdd ? (
        <RequestAdd
          isRequestAdd={isRequestAdd}
          handleRequestAdd={handleRequestAdd}
        />
      ) : (
        <></>
      )}
      {isRequestList ? (
        <RequestList
          isRequestList={isRequestList}
          handleRequestList={handleRequestList}
          // setIsOnload={setIsOnload}
        />
      ) : (
        <></>
      )}

      <div
        className={`transition fixed backdrop-blur-[10px] bg-[rgba(0,0,0,0.7)] border-[rgba(255,255,255,0.4)] border-b-[0px] border-l-[1px] max-w-[400px] min-w-[300px] w-[30vw] max-h-[700px] min-h-[545px] h-[80vh] rounded duration-500 ease-in-out  right-0 ${
          isDrawer ? "block" : "hidden" //ส่งพารามิเตอร์เปลือง
        } `}
      >
        <div id="header">
          <div
            className="transition duration-300 ease-in-out cursor-pointer bg-black border-[1px] border-white max-w-[45px] min-w-[35px] w-[20vw] max-h-[35px] h-[20vh] min-h-[20px] scale-125 hover:scale-150 text-white absolute top-3 rounded"
            onClick={handleDrawer}
          >
            <FiChevronsRight className="w-full h-full" />
          </div>
          {userImage ? (
            <img
              src={userImage}
              onClick={handleShowProfileDrawer}
              className="cursor-pointer hover:scale-105 bg-cover w-[80px] h-[80px] rounded-[100%] mx-auto mt-5 mb-5"
            ></img>
          ) : (
            <img
              src={profileImageNewUser()}
              onClick={handleShowProfileDrawer}
              className="cursor-pointer hover:scale-105 bg-cover w-[80px] h-[80px] rounded-[100%] mx-auto mt-3 mb-5"
            ></img>
          )}
          <div className="text-center mx-auto font-bold text-[30px] text-white">
            {userName}
          </div>
        </div>

        <div id="body" className="mt-10">
          <div
            onClick={handleProfileDrawer}
            className=" rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(218,218,218,0.1)] hover:bg-[rgba(218,218,218,0.4)] px-5 text-[20px] py-3 hover:scale-105 hover:mr-3 hover:underline duration-300"
          >
            Edit profile
          </div>
          {role === "admin" ? (
            <div
              onClick={() => {
                // navigate("/add");
                setIsAddCollection(!isAddCollection);
                // handleDrawer();
              }}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(218,218,218,0.1)] hover:bg-[rgba(218,218,218,0.4)] px-5 text-[20px] py-3 hover:scale-105 hover:mr-3 hover:underline duration-300"
            >
              Add collection
            </div>
          ) : (
            <></>
          )}
          {role === "admin" ? (
            <div
              onClick={() => {
                handleRequestList();
              }}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(163,163,163,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
            >
              Request list
            </div>
          ) : (
            <div
              onClick={() => {
                handleMyCollection();
                handleDrawer();
              }}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(163,163,163,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
            >
              My collection
            </div>
          )}
          {role === "admin" ? (
            <></>
          ) : (
            <div
              onClick={() => {
                handleMyFavorites();
                handleDrawer();
              }}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(218,218,218,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
            >
              My favorites
            </div>
          )}

          {role === "admin" ? (
            <></>
          ) : (
            <div
              onClick={() => {
                handleRequestAdd();
              }}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(163,163,163,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
            >
              Request add collection
            </div>
          )}

          <div className="absolute bottom-0 w-full">
            <div
              onClick={handlePasswordDrawer}
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(218,218,218,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
            >
              Change password
            </div>
            <div
              className="rounded border-[2px] border-transparent hover:border-b-white hover:border-l-white text-white cursor-pointer bg-[rgba(163,163,163,0.1)] hover:bg-[rgba(218,218,218,0.4)] hover:mr-3 px-5 text-[20px] py-3 hover:scale-105 hover:underline duration-300"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
