import React, { useState } from "react";
import convertToBase64 from "../../helper/base64";
import { BsFillPlusCircleFill, BsFillTrashFill } from "react-icons/bs";
import { FiChevronsLeft } from "react-icons/fi";
import CreateRequestAPI from "../../api/CreateRequest";

const RequestAdd = (props) => {
  const { isRequestAdd, handleRequestAdd } = props;
  const [selectedFileCollection, setSelectedFileCollection] = useState(null);
  const [selectedFileBooks, setSelectedFileBooks] = useState([null]);
  const [formCollection, setFormCollection] = useState({
    collectionName: "",
    collectionBuff: "",
  });
  const [formBooks, setFormBooks] = useState([
    // {
    //   name: "",
    //   description: "",
    //   buff: "",
    // },
  ]);

  const handleAddTodo = () => {
    setFormBooks([
      ...formBooks,
      {
        name: "",
        description: "",
        buff: "",
      },
    ]);
  };
  const handleDeleteTodo = (index) => {
    const newFormBooks = formBooks.filter((_, i) => i !== index);
    setFormBooks(newFormBooks);
  };
  const onUpload = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setSelectedFileCollection(base64);
      setFormCollection({ ...formCollection, collectionBuff: base64 });
      // console.log(formCollection.collectionBuff);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };
  const handleUpdate = (e) => {
    setFormCollection({
      ...formCollection,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateBook = (e, index) => {
    const updatedBooks = formBooks.map((book, i) => {
      if (i === index) {
        return { ...book, [e.target.name]: e.target.value };
      }
      return book;
    });

    setFormBooks(updatedBooks);
  };
  const handleButtonClick = () => {
    document.getElementById("myFileInput").click();
  };

  const handleButtonClicks = (index) => {
    document.getElementById("myFileInput" + index).click();
  };
  // console.log(formCollection);
  // console.log(formBooks);
  const handleSubmit = () => {
    async function submit() {
      const res = CreateRequestAPI(
        formCollection.collectionName,
        selectedFileCollection,
        formBooks
      );
      console.log(res);
    }
    submit();
  };
  const onUploadBooks = async (e, index) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);

      const updatedSelectedFiles = [...selectedFileBooks];
      updatedSelectedFiles[index] = {
        ...updatedSelectedFiles[index],
        buff: base64,
      };
      setSelectedFileBooks(updatedSelectedFiles);

      const updatedFormBooks = [...formBooks];
      updatedFormBooks[index] = { ...updatedFormBooks[index], buff: base64 };
      setFormBooks(updatedFormBooks);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };
  // const onUploadBooks = async (e) => {
  //   try {
  //     const base64 = await convertToBase64(e.target.files[0]);
  //     setSelectedFileBooks([{ ...selectedFileBooks, buff: base64 }]);
  //     setFormBooks({ ...formBooks, buff: base64 });
  //     // console.log(base64);
  //   } catch (error) {
  //     console.error("File upload error:", error);
  //   }
  // };

  return (
    <div>
      <div
        className={`z-10 absolute backdrop-blur bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] ${
          isRequestAdd ? "block" : "hidden"
        }`}
        onClick={() => {
          handleRequestAdd();
        }}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <div className="relative z-30 pt-[10px] flex flex-col gap-10 mt-[6vh] px-[50px] bg-[rgba(0,0,0,0.5)] border-[2px] h-[90vh] border-white rounded-[10px]">
          <label className="text-white text-[30px] mt-2 mx-auto font-bold">
            Request add collection
          </label>
          <div className="mx-auto">
            <input
              type="file"
              id="myFileInput"
              onChange={onUpload}
              className="hidden"
            />
            {selectedFileCollection ? (
              <img
                src={selectedFileCollection}
                onClick={handleButtonClick}
                className=" peer border-[1px] border-black hover:border-white z-40 cursor-pointer right-[170px] max-h-[300px] max-w-[200px] h-[15vw] w-[10vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
              />
            ) : (
              <div className="">
                <BsFillPlusCircleFill
                  onClick={handleButtonClick}
                  className="border-[2px] border-[rgba(255,255,255,0.7)] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] hover:border-white z-40 cursor-pointer right-[170px] max-h-[300px] max-w-[200px] h-[15vw] w-[10vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
                />
              </div>
            )}
          </div>
          <div className=" absolute right-[-5px] top-[-5px]">
            <div
              onClick={() => {
                handleRequestAdd();
                // handleAddCollection();
              }}
              className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                isRequestAdd ? "block" : "hidden"
              }`}
            >
              <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
            </div>
          </div>
          <form
            // onSubmit={handleSubmit}
            className="relative max-w-[500px] max-h-[250px] w-[35vw] h-[40vh] min-w-[450px] min-h-[200px]"
          >
            {/* <div className="absolute h-[90vh] bg-black w-[2vw]"></div> */}
            <div className="z-10 relative w-[470px] h-[60px]  ">
              <input
                type="text"
                id="collectionName"
                name="collectionName"
                onChange={handleUpdate}
                value={formCollection.collectionName}
                required
                className="z-30 text-[17px] absolute top-0 peer w-[460px] focus:w-[280px] valid:w-[280px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000"
              />
              <label className="ml-5 absolute top-1 w-[180px] left-0 text-white text-[20px] peer-focus:scale-105">
                Collection name
              </label>
            </div>
            <div className="h-[300px] w-[470px]  flex-wrap overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white">
              {formBooks.map((item, index) => (
                <div
                  key={index}
                  className="z-10 relative my-3 w-[440px] h-[130px] gap-y-2 gap-x-5 border-y-[1px] border-white flex mx-auto"
                >
                  <div className="h-[120px] my-auto w-[100px] border-[1px] border-white">
                    <input
                      type="file"
                      id={`myFileInput${index}`}
                      onChange={(e) => onUploadBooks(e, index)}
                      className="hidden"
                    />
                    {/* {console.log(selectedFileBooks[index])} */}
                    {selectedFileBooks[index] ? (
                      <img
                        key={index}
                        src={selectedFileBooks[index].buff}
                        onClick={() => {
                          handleButtonClicks(index);
                        }}
                        className="border-[2px] hover:scale-105 border-[rgba(255,255,255,0.7)] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] hover:border-white z-40 cursor-pointer right-[170px] h-[120px] w-[100px] transition ease-in-out duration-300"
                        // className=" peer border-[1px] border-black hover:border-white z-40 cursor-pointer right-[170px] max-h-[300px] max-w-[200px] h-[15vw] w-[10vw] min-h-[200px] min-w-[150px] hover:scale-105 transition ease-in-out duration-300"
                      />
                    ) : (
                      <div className="">
                        <BsFillPlusCircleFill
                          key={index}
                          onClick={() => {
                            handleButtonClicks(index);
                          }}
                          className="border-[2px] hover:scale-105 border-[rgba(255,255,255,0.7)] text-[rgba(255,255,255,0.5)] hover:text-[rgba(255,255,255,0.9)] hover:border-white z-40 cursor-pointer right-[170px] h-[120px] w-[100px] transition ease-in-out duration-300"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex gap-x-3">
                      <label className="text-white">
                        Book name {index + 1}
                      </label>
                      <input
                        key={index}
                        type="text"
                        id={`name`}
                        name={`name`}
                        onChange={(e) => handleUpdateBook(e, index)}
                        value={item.name}
                        required
                        className="bg-transparent outline-none border-b-[1px] border-white mb-1 text-white w-[160px]"
                        // className="z-30 text-[15px]  top-0 peer w-[460px] focus:w-[280px] valid:w-[280px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000"
                      />
                    </div>
                    <div className="flex gap-x-4">
                      <div>
                        <label className="text-white">description :</label>
                      </div>
                      <div>
                        <textarea
                          key={index}
                          type="text"
                          id={`description`}
                          name={`description`}
                          onChange={(e) => handleUpdateBook(e, index)}
                          value={item.description}
                          // required
                          className="bg-transparent outline-none border-[1px] w-[180px] h-[70px] border-white mb-1 text-white"
                          // className="z-30 text-[15px] top-0 peer w-[460px] focus:w-[280px] valid:w-[280px] px-[10px] py-2 pr-[10px] outline-none bg-transparent border-b-[1px] text-white focus:right-[0px] valid:right-[0px] transition ease-linear duration-1000"
                        />
                      </div>
                      <BsFillTrashFill
                        onClick={() => {
                          handleDeleteTodo(index);
                        }}
                        className="text-white hover:text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <BsFillPlusCircleFill
                onClick={handleAddTodo}
                className="mx-auto rounded-[10px] hover:text-white transition duration-500 ease-in-out my-3 w-[60px] p-3 hover:p-1 h-[50px] border-[rgba(255,255,255,0.5)] text-[rgba(255,255,255,0.5)] border-[1px] cursor-pointer "
              />
            </div>

            {/* <div className="h-[200px] border-white border-2"></div> */}

            {/* <div className="absolute mx-auto"> */}
            <button
              onClick={handleSubmit}
              // onClick={handleAddTodo}
              className="ml-[120px] absolute duration-300 w-[250px] h-[40px] bg-[#fff] text-[20px] text-center text-black hover:bg-[#fff] rounded-[20px] border-solid border-[1px] border-white hover:border-slate-500 hover:font-bold hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestAdd;
