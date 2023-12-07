import React, { useEffect, useState } from "react";
import GetRequestAPI from "../../api/GetRequest";
import { FiChevronsLeft } from "react-icons/fi";
import Onload from "./Onload";
import { BsCheckLg, BsFillTrashFill } from "react-icons/bs";
import DeleteRequestAPI from "../../api/DeleteRequest";
import AddCollectionAPI from "../../api/AddCollection";
import AddBookDataAPI from "../../api/UpdateBook";

const RequestList = (props) => {
  const { isRequestList, handleRequestList } = props;
  const [form, setForm] = useState([]);
  const [isOnload, setIsOnload] = useState(false);

  useEffect(() => {
    setIsOnload(true);
    async function getRequest() {
      try {
        const res = await GetRequestAPI();
        setForm(res);
      } catch {
      } finally {
        setIsOnload(false);
      }

      //   console.log(res[0].collectionBuff);
    }
    getRequest();
  }, []);

  const deleteRequest = async (reqId) => {
    setIsOnload(true);
    try {
      //   async function rmReq() {
      await DeleteRequestAPI(reqId);
      //   }
      //   rmReq();
      //   async function getRequest() {
      const res = await GetRequestAPI();
      setForm(res);
      // setIsOnload(false);
      //   console.log(res[0].collectionBuff);
      //   }
      //   getRequest();
    } catch {
    } finally {
      setIsOnload(false);
    }
  };

  const CollectionAndBooks = async (index) => {
    setIsOnload(true);
    try {
      const res = await AddCollectionAPI({
        name: form[index].collectionName,
        buff: form[index].collectionBuff,
      });
      // console.log(res);
      form[index].books.map(async (item, i) => {
        await AddBookDataAPI({
          name: item.name,
          description: item.description,
          bookCollection: res,
          buff: item.buff,
        });
      });
      await DeleteRequestAPI(form[index]._id);
      const res2 = await GetRequestAPI();
      setForm(res2);
    } catch {
    } finally {
      setIsOnload(false);
    }
  };

  return (
    <div>
      {isOnload ? <Onload /> : <></>}

      <div
        className={`z-10 absolute backdrop-blur bg-[rgba(0,0,0,0.5)] w-[100vw] h-[100vh] ${
          isRequestList ? "block" : "hidden"
        }`}
        onClick={() => {
          handleRequestList();
        }}
      ></div>
      <div className="absolute inset-[0] top-[45vh] left-[5vw] flex justify-center items-center">
        <div className="relative z-30 pt-[10px] flex flex-col gap-10 mt-[6vh] px-[50px] bg-[rgba(0,0,0,0.5)] border-[2px] h-[90vh] border-white rounded-[10px]">
          <label className="text-white text-[35px] mt-3 mx-auto font-bold">
            Request list
          </label>

          <div className=" absolute right-[-5px] top-[-5px]">
            <div
              onClick={() => {
                handleRequestList();
                // handleAddCollection();
              }}
              className={`cursor-pointer rounded bg-black z-30 relative text-white w-[40px] h-[40px] hover:scale-110 ${
                isRequestList ? "block" : "hidden"
              }`}
            >
              <FiChevronsLeft className="w-full h-full border-white border-[2px] rounded" />
            </div>
          </div>
          <form
            //   onSubmit={handleSubmit}
            className="relative max-w-[500px] max-h-[250px] w-[35vw] h-[40vh] min-w-[450px] min-h-[200px]"
          >
            <div className="mx-auto h-[75vh] px-[25px] py-2 border-y-[2px] border-[rgba(255,255,255,0.5)] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white">
              {form.length === 0 ? (
                <div className=" flex">
                  <div className="my-auto text-[rgba(90,90,90,0.5)] cursor-default font-bold text-[50px] mx-auto">
                    No request
                  </div>
                </div>
              ) : (
                <></>
              )}
              {form.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 flex gap-10 border-y-[1px] border-white "
                >
                  <img
                    src={item.collectionBuff}
                    className="h-[120px] w-[100px]"
                  />
                  <div className="text-white text-[20px] my-auto w-[15rem]">
                    Collection : {item.collectionName}
                    <div className="text-gray-400 text[14px]">
                      {item.books.length} books in collection
                    </div>
                  </div>
                  <div>
                    <BsCheckLg
                      onClick={() => {
                        CollectionAndBooks(index);
                      }}
                      className="mt-[25px] text-white hover:text-green-600 cursor-pointer my-auto w-[20px] h-[20px]"
                    />
                    <BsFillTrashFill
                      onClick={() => {
                        deleteRequest(item._id);
                      }}
                      className="mt-[20px] text-white hover:text-red-600 cursor-pointer my-auto w-[20px] h-[20px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
