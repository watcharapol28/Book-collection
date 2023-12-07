import React, { useState } from "react";
import convertToBase64 from "../../helper/base64";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FiChevronsLeft } from "react-icons/fi";
import AddCollectionAPI from "../../api/AddCollection";

const AddCollection = (props) => {
  const { isAddCollection, handleAddCollection } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    buff: "",
  });
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
  const handleSubmit = () => {
    async function submit() {
      const res = AddCollectionAPI(form);
      console.log(res);
    }
    submit();
  };

  const handleUpdate = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleButtonClick = () => {
    document.getElementById("myFileInput").click();
  };
  return (
    <div>
      <div
        className={`z-10 absolute bg-[rgba(0,0,0,0.5)] backdrop-blur w-[100vw] h-[100vh] bg-transpent top-[0] left-[0] ${
          isAddCollection ? "block" : "hidden"
        }`}
        onClick={handleAddCollection}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <div className="relative z-30 pt-[30px] flex flex-col gap-10 mt-[6vh] px-[50px] bg-[rgba(0,0,0,0.5)] border-[2px] border-white rounded-[10px]">
          <label className="text-white text-[35px] my-2 mx-auto font-bold">
            Add collection
          </label>
          <div className="mx-auto">
            <input
              type="file"
              id="myFileInput"
              onChange={onUpload}
              className="hidden"
            />
            {selectedFile ? (
              <img
                src={selectedFile}
                onClick={handleButtonClick}
                className=" peer border-[1px] border-black hover:border-white z-40 cursor-pointer right-[170px] max-h-[400px] max-w-[300px] h-[20vw] w-[15vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
              />
            ) : (
              <div className="">
                <BsFillPlusCircleFill
                  onClick={handleButtonClick}
                  className="border-[2px] border-[rgba(255,255,255,0.7)] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] hover:border-white z-40 cursor-pointer right-[170px] max-h-[400px] max-w-[300px] h-[20vw] w-[15vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
                />
              </div>
            )}
          </div>
          <div className=" absolute right-[-5px] top-[-5px]">
            <div
              onClick={() => {
                handleAddCollection();
              }}
              className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                isAddCollection ? "block" : "hidden"
              }`}
            >
              <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
            </div>
          </div>
          <form
            //   onSubmit={handleSubmit}
            className="relative mt-10 max-w-[500px] max-h-[250px] w-[35vw] h-[40vh] min-w-[450px] min-h-[200px]"
          >
            <div className="z-10 relative w-[470px] h-[100px] ">
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleUpdate}
                value={form.name}
                required
                className="z-30 text-[20px] absolute top-0 peer w-[460px] focus:w-[280px] valid:w-[280px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000"
              />
              <label className="absolute top-1 w-[180px] left-0 text-white text-[23px] peer-focus:scale-105">
                Collection name
              </label>
            </div>

            {/* <div className="absolute mx-auto"> */}
            <button
              onClick={handleSubmit}
              className="ml-[100px] absolute duration-300 w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:border-slate-500 hover:font-bold hover:scale-105"
            >
              Submit
            </button>
            {/* </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCollection;
