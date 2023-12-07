import { React, useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import "../../styles/Profile.css";
import convertToBase64 from "../../helper/base64";
import UpdateProfileAPI from "../../api/UpdateProfile";
import profileImageNewUser from "../../helper/profileNew";
// import { useNavigate } from "react-router-dom";
// import UserDataAPI from "../../api/UserData";

const Profile = (props) => {
  // const navigate = useNavigate();
  const { handleProfileDrawer, profileDrawer, UserID, userImage } = props;
  // const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    sex: "",
    dateOfBirth: "",
    buff: "",
  });

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };
  const onUpload = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setSelectedFile(base64);
      setForm({ ...form, buff: base64 });
      // console.log(base64);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log(form.buff);
      const res = await UpdateProfileAPI(UserID, form);

      if (res.status === 201) {
        window.location.reload();
        // console.log("File uploaded successfully:", res.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleButtonClick = () => {
    document.getElementById("myFileInput").click();
  };

  const handleUpdate = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(userImage);

  return (
    <div>
      <div
        className={`z-10 absolute backdrop-blur bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] ${
          profileDrawer ? "block" : "hidden"
        }`}
        onClick={() => {
          handleProfileDrawer();
        }}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <>
          <label className="absolute text-white z-30 text-[30px] font-bold -top-[280px]">
            Edit Profile
          </label>
          <form
            onSubmit={handleSubmit}
            className={` z-20 text-center border-[2px] backdrop-blur-[8px] border-[rgba(255,255,255,1)] rounded-[10px] pt-[20px] pb-[20px] duration-300 ${
              profileDrawer ? "block" : "hidden"
            }`}
          >
            <input
              type="file"
              id="myFileInput"
              // onChange={handleFileChange}
              onChange={onUpload}
              className="hidden"
            />
            {selectedFile ? (
              <img
                src={selectedFile}
                onClick={handleButtonClick}
                className="border-[2px] border-white z-40 cursor-pointer right-[170px] h-[90px] w-[90px] rounded-[100%] absolute top-[60px] hover:scale-105 transition ease-in-out duration-300"
              />
            ) : (
              <></>
            )}
            {userImage ? (
              <img
                src={userImage}
                onClick={handleButtonClick}
                className="border-[2px] border-white z-30 cursor-pointer right-[170px] h-[90px] w-[90px] rounded-[100%] absolute top-[60px] hover:scale-105 transition ease-in-out duration-300"
              />
            ) : (
              <img
                src={profileImageNewUser()}
                onClick={handleButtonClick}
                className="border-[2px] border-white z-30 cursor-pointer right-[170px] h-[90px] w-[90px] rounded-[100%] absolute top-[60px] hover:scale-105 transition ease-in-out duration-300"
              />
            )}

            <div className="h-[80px]"></div>
            <div className="absolute right-[-5px] top-[-5px]">
              <div
                onClick={() => {
                  handleProfileDrawer();
                }}
                className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                  profileDrawer ? "block" : "hidden"
                }`}
              >
                <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
              </div>
            </div>
            <div className="px-10 py-10">
              <div className="relative ">
                <div className="relative ">
                  <input
                    // type={isShowPass2 ? "password" : "text"}
                    id="firstname"
                    name="firstname"
                    onChange={handleUpdate}
                    value={form.firstname}
                    required
                    className="mt-12 w-[350px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  />
                  <label
                    htmlFor="firstname"
                    className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-5 scale-110 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-3 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-2 peer-valid:left-4 peer-valid:scale-90 peer-valid:top-20`}
                  >
                    First name
                  </label>
                </div>
              </div>
              <div className="relative ">
                <div className="relative ">
                  <input
                    // type={isShowPass3 ? "password" : "text"}
                    id="lastname"
                    name="lastname"
                    onChange={handleUpdate}
                    value={form.lastname}
                    required
                    className="mt-12 w-[350px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  />
                  <label
                    htmlFor="lastname"
                    className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-5 scale-110 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-3 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-2 peer-valid:left-4 peer-valid:scale-90 peer-valid:top-20`}
                  >
                    Last name
                  </label>
                </div>
              </div>
              <div className="relative flex gap-10">
                <div className="relative ">
                  <select
                    // type="radio"
                    // type={isShowPass3 ? "password" : "text"}
                    id="sex"
                    name="sex"
                    onChange={handleUpdate}
                    value={form.sex}
                    required
                    // autoFocus
                    className=" mt-12 w-[150px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  >
                    <option
                      value=""
                      className="hidden text-white bg-black"
                    ></option>
                    <option value="Male" className="text-white bg-black">
                      Male
                    </option>
                    <option value="Female" className="text-white bg-black">
                      Female
                    </option>
                    <option
                      value="Other"
                      // autoFocus
                      className="text-white bg-black"
                    >
                      Other
                    </option>
                  </select>
                  <label
                    htmlFor="sex"
                    className={`text-[#fff] absolute duration-300 transform -translate-y-[225%] top-28 left-5 scale-110 peer-focus:text-white peer-focus:top-14 peer-focus:pl-3 peer-focus:left-3 peer-focus:scale-90 peer-focus:-translate-y-8 peer-placeholder-shown:top-14 peer-valid:pl-2 peer-valid:left-4 peer-valid:scale-90 peer-valid:top-20`}
                  >
                    Sex
                  </label>
                </div>
                <div className="relative ">
                  <input
                    type="date"
                    // type={isShowPass3 ? "password" : "text"}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    onChange={handleUpdate}
                    value={form.dateOfBirth}
                    required
                    className="mt-12 w-[150px] px-[10px] py-2 pr-[10px] peer outline-none bg-transparent border-b-[1px] text-white"
                  />
                  <label
                    htmlFor="dateOfBirth"
                    className={`text-[#fff] absolute duration-1000 transform top-14 pl-3 left-3 scale-90 -translate-y-8 translate ease-in-out`}
                  >
                    Date Of Birth
                  </label>
                </div>
              </div>
              <button className="duration-300 mt-[70px] w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:scale-105">
                Update
              </button>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default Profile;
