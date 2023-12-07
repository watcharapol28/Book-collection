import React, { useState } from "react";
import convertToBase64 from "../../helper/base64";
import AddBookDataAPI from "../../api/UpdateBook";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AddBook = (props) => {
  const { CollectionId } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    bookCollection: CollectionId,
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

  const handleSubmit = async () => {
    // async function submit() {
    await AddBookDataAPI(form);
    // console.log(res);
    // }
    // submit();
  };

  const handleUpdate = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = async () => {
    document.getElementById("myFileInput").click();
  };

  return (
    <div className="">
      <div className=" mt-[6vh] mx-10 flex justify-center">
        <div>
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
              className="peer border-[1px] border-black hover:border-white z-40 cursor-pointer right-[170px] max-h-[400px] max-w-[300px] h-[20vw] w-[15vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
            />
          ) : (
            <div className="">
              {/* <div
                // src={selectedFile}
                onClick={handleButtonClick}
                className=" peer border-[1px] border-black hover:border-white z-40 cursor-pointer right-[170px] max-h-[400px] max-w-[300px] h-[20vw] w-[15vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
              ></div> */}
              <BsFillPlusCircleFill
                onClick={handleButtonClick}
                className="border-[2px] border-[rgba(255,255,255,0.7)] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] hover:border-white z-40 cursor-pointer right-[170px] max-h-[400px] max-w-[300px] h-[20vw] w-[15vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
              />
            </div>
          )}
        </div>
        <form
          //   onSubmit={handleSubmit}
          className="relative  ml-[5vw] mt-0 max-w-[700px] max-h-[400px] w-[35vw] h-[40vh] min-w-[500px] min-h-[300px]"
        >
          <div className="z-30 relative w-[410px] h-[100px] ">
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleUpdate}
              value={form.name}
              required
              className="z-30 text-[20px] absolute top-0 peer w-[400px] focus:w-[280px] valid:w-[280px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000"
            />
            <label className="absolute top-1 w-[120px] left-0 text-white text-[23px] peer-focus:scale-105">
              Book name
            </label>
          </div>
          <div className="z-10 relative w-[410px] h-[100px]">
            <textarea
              rows="4"
              cols="50"
              type="text"
              id="description"
              name="description"
              onChange={handleUpdate}
              value={form.description}
              className=" z-10 text-[20px] border-[1px] absolute -top-[90px] focus:top-0 valid:top-0 focus:w-[280px] valid:w-[280px] peer w-[400px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black"
            />
            {/* <div className="absolute border-b-[1px] border-white w-[280px] h-[35px] bg-transparent right-0"></div>
            <div className="absolute border-b-[1px] border-white w-[280px] h-[65px] bg-transparent right-0"></div>
            <div className="absolute border-b-[1px] border-white w-[280px] h-[95px] bg-transparent right-0"></div> */}
            <label className="absolute top-1 w-[120px] left-0 text-white text-[23px] peer-focus:scale-105">
              Book detail
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="absolute bottom-0 duration-300 ml-[7vh] w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
