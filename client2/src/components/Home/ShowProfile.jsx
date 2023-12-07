import { React, useEffect, useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import "../../styles/Profile.css";
// import convertToBase64 from "../../helper/base64";
// import UpdateProfileAPI from "../../api/UpdateProfile";
import profileImageNewUser from "../../helper/profileNew";
// import { useNavigate } from "react-router-dom";
import UserDataAPI from "../../api/UserData";
import getFavAPI from "../../api/getFavBook";
import getOwnedAPI from "../../api/getOwned";

const ShowProfile = (props) => {
  const { handleShowProfileDrawer, showProfileDrawer, UserID } = props;
  const [userImage, setUserImage] = useState("");
  const [user1stName, setUser1stName] = useState("");
  const [user2ndName, setUser2ndName] = useState("");
  const [userSex, setUserSex] = useState("");
  const [userDate, setUserDate] = useState("");
  const [userLikedBooks, setUserLikedBooks] = useState(0);
  const [userOwnedBooks, setUserOwnedBooks] = useState(0);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    async function fetchUser() {
      const res = await UserDataAPI(UserID);
      setUserImage(res.buff);
      setUser1stName(res.firstName);
      setUser2ndName(res.lastName);
      setUserSex(res.sex);
      setUserRole(res.role);
      const dateObj = new Date(res.dateOfBirth);
      setUserDate(dateObj.toLocaleDateString("en-GB"));

      // console.log(res);
    }
    fetchUser();

    async function fetchFav() {
      const res = await getFavAPI(UserID);
      // console.log(res.length);
      setUserLikedBooks(res.length);
    }
    fetchFav();

    async function fetchOwned() {
      const res = await getOwnedAPI(UserID);
      // console.log(res.length);
      setUserOwnedBooks(res.length);
    }
    fetchOwned();
  });

  return (
    <div>
      <div
        className={`z-10 absolute backdrop-blur bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] ${
          showProfileDrawer ? "block" : "hidden"
        }`}
        onClick={() => {
          handleShowProfileDrawer();
        }}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <>
          <label className="absolute text-white z-30 text-[30px] font-bold -top-[240px]">
            Profile
          </label>
          <form
            // onSubmit={handleSubmit}
            className={` z-20 text-center border-[2px] backdrop-blur-[8px] border-[rgba(255,255,255,1)] rounded-[10px] pt-[20px] pb-[20px] duration-300 ${
              showProfileDrawer ? "block" : "hidden"
            }`}
          >
            {userImage ? (
              <img
                src={userImage}
                // onClick={handleButtonClick}
                className="border-[2px] border-white z-30 right-[170px] h-[90px] w-[90px] rounded-[100%] absolute top-[95px] transition ease-in-out duration-300"
              />
            ) : (
              <img
                src={profileImageNewUser()}
                // onClick={handleButtonClick}
                className="border-[2px] border-white z-30 right-[170px] h-[90px] w-[90px] rounded-[100%] absolute top-[95px] transition ease-in-out duration-300"
              />
            )}

            <div className="h-[80px] mt-10"></div>
            <div className="absolute right-[-5px] top-[-5px]">
              <div
                onClick={() => {
                  handleShowProfileDrawer();
                }}
                className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                  showProfileDrawer ? "block" : "hidden"
                }`}
              >
                <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
              </div>
            </div>
            <div className="mt-[50px] px-10 pt-10 flex gap-10 w-[430px] justify-center">
              <div className="text-white text-[24px] max-w-[200px]">
                {user1stName}
              </div>
              <div className="text-white text-[24px] max-w-[200px]">
                {user2ndName}
              </div>
            </div>
            <div className=" px-10 pt-10 flex gap-10 w-[430px] justify-center">
              <div className="text-white text-[17px] max-w-[200px]">
                Sex : {userSex}
              </div>
              <div className="text-white text-[17px] max-w-[200px]">
                Birth : {userDate}
              </div>
            </div>
            {userRole !== "admin" ? (
              <div>
                <div className="mt-7 px-10 pt-10 flex gap-10 w-[430px] justify-center">
                  <div className="text-white text-[17px] max-w-[200px]">
                    {userOwnedBooks < 2
                      ? "Owned book : " + userOwnedBooks
                      : "Owned books : " + userOwnedBooks}
                  </div>
                </div>
                <div className=" px-10 py-5 mb-5 flex gap-10 w-[430px] justify-center">
                  <div className="text-white text-[17px] max-w-[200px]">
                    {userLikedBooks < 2
                      ? "Liked book : " + userLikedBooks
                      : "Liked books : " + userLikedBooks}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mt-7 px-10 pt-10 flex gap-10 w-[430px] justify-center">
                  <div className="text-white text-[17px] max-w-[200px]"></div>
                </div>
                <label className="text-white text-[20px] max-w-[200px]">
                  ( Admin )
                </label>
                <div className=" px-10 py-5 mb-5 flex gap-10 w-[430px] justify-center">
                  <div className="text-white text-[17px] max-w-[200px]"></div>
                </div>
              </div>
            )}
          </form>
        </>
      </div>
    </div>
  );
};

export default ShowProfile;
