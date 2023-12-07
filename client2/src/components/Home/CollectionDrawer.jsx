import React, { useState, useEffect } from "react";
import { getAcessToken } from "../../helper/getToken";
import BookDataAPI from "../../api/Bookdata";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
  BsBookmarkCheckFill,
  BsBookmarkPlus,
  BsHeart,
  BsHeartFill,
  BsBook,
  BsFillPlusCircleFill,
  BsFillTrash3Fill,
  BsWrench,
} from "react-icons/bs";
import { FiArrowDownLeft } from "react-icons/fi";
import BookDrawer from "./BookDrawer";
import UserDataAPI from "../../api/UserData";
import AddBook from "./AddBook";
import DeleteBookDataAPI from "../../api/DeleteBook";
import getFavAPI from "../../api/getFavBook";
import createFavAPI from "../../api/FavBook";
import removeFavAPI from "../../api/deleteFavBook";
import createOwnedAPI from "../../api/addOwned";
import getOwnedAPI from "../../api/getOwned";
import removeOwnedAPI from "../../api/deleteOwned";
import EditBook from "./EditBook";
import DeleteCollectionAPI from "../../api/DeleteCollection";

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

const CollectionDrawer = (props) => {
  const [check1, setCheck1] = useState(true);
  // const [check2, setCheck2] = useState(true);
  const {
    handleCollectionDrawer,
    isCollectionDrawer,
    collection,
    hideName,
    setHideName,
    setIsOnload,
  } = props;
  const [isBookDrawer, setIsBookDrawer] = useState(false);
  const [isAddBook, setIsAddBook] = useState(false);
  const [isEditBook, setIsEditBook] = useState(false);
  // const [bookSend, setBookSend] = useState({
  //   bookCollection: "",
  //   buff: "",
  //   name: "",
  // });
  const [bookId, setBookId] = useState("");
  function handleBookDrawer(bookId) {
    // console.log(bookId);
    setCheck1(!check1);
    setBookId(bookId);
    setIsBookDrawer(!isBookDrawer);
  }

  // const [mark, setMark] = useState(false);
  // const [hideName, setHideName] = useState(false);

  const [bookData, setBookData] = useState([]);
  const [favList, setFavList] = useState([]);
  const [ownedList, setOwnedList] = useState([]);
  // const [newFav, setNewFav] = useState([]);

  const token = getAcessToken();
  const UserID = token === "" ? "" : parseJwt(token).userId;
  const [role, setRole] = useState("");
  useEffect(() => {
    setIsOnload(true);
    async function fetchFav() {
      const res = await getFavAPI(UserID);
      setFavList(res);
    }
    fetchFav();
    async function fetchOwned() {
      const res = await getOwnedAPI(UserID);
      setOwnedList(res);
    }
    fetchOwned();

    async function fetchBook() {
      const res = await BookDataAPI(collection._id);
      setBookData(res);

      setIsOnload(false);
      // console.log(res);
    }
    async function getUserRole() {
      const res = await UserDataAPI(UserID);
      setRole(res.role);
    }

    getUserRole();
    fetchBook();
  }, []);
  // const fetchLikeStatus = () => {
  //   const isLiked = favList.some((favItem) => favItem.book_id === bookData._id);
  //   setLike(isLiked);
  // };
  const handleCheck = async () => {
    // setIsOnload(true);
    // async function fetchFav() {
    const res = await getFavAPI(UserID);
    setFavList(res);
    // setIsOnload(false);
    // }
    // fetchFav();
    // setIsOnload(true);
    // async function fetchOwned() {
    const res2 = await getOwnedAPI(UserID);
    setOwnedList(res2);
    // setIsOnload(false);
    // }
    // fetchOwned();
  };

  const handleDeleteCollection = async (CollectionId) => {
    // async function delCollection() {
    setIsOnload(true);
    // console.log({ UserID, bookId });
    try {
      await DeleteCollectionAPI(CollectionId);

      setTimeout(() => {}, 1000);
      const res = await BookDataAPI(CollectionId);
      if (res.length === 0) {
      } else {
        setTimeout(() => {}, 2000);
        res.map(async (item, index) => {
          // console.log(item._id);
          await DeleteBookDataAPI(item._id);
        });
      }
    } catch {
    } finally {
      setIsOnload(false);
    }

    // }
    // delCollection();
  };
  const handleEditBook = async (Id) => {
    setIsEditBook(!isEditBook);
    setBookId(Id);
    // console.log(bookId);
  };

  const handleFavBook = async (bookId) => {
    // async function createFavBook() {
    // console.log({ UserID, bookId });
    await createFavAPI({ UserID, bookId });
    const res = await getFavAPI(UserID);
    setFavList(res);
    // }
    // createFavBook();
  };
  const handleOwnedBook = async (bookId) => {
    // async function createOwnedBook() {
    // console.log({ UserID, bookId });
    await createOwnedAPI({ UserID, bookId });
    const res2 = await getOwnedAPI(UserID);
    setOwnedList(res2);
    // }
    // createOwnedBook();
  };
  const handleFavRemoveBook = async (bookId) => {
    // async function rmFavBook() {
    // console.log({ UserID, bookId });
    await removeFavAPI({ UserID, bookId });
    const res = await getFavAPI(UserID);
    setFavList(res);
    // }
    // rmFavBook();
  };
  const handleOwnedRemoveBook = async (bookId) => {
    // async function rmOwnedBook() {
    // console.log({ UserID, bookId });
    await removeOwnedAPI({ UserID, bookId });
    const res2 = await getOwnedAPI(UserID);
    setOwnedList(res2);
    // }
    // rmOwnedBook();
  };
  const handleDeleteBook = async (bookId) => {
    setIsOnload(true);
    // async function delBook() {
    await DeleteBookDataAPI(bookId);

    const res = await BookDataAPI(collection._id);
    setBookData(res);

    setIsOnload(false);
  };

  return (
    <>
      <div
        className={`bg-transpent backdrop-blur-[5px] fixed w-full h-full bg-transpent top-[0] left-[0] ${
          isCollectionDrawer ? "block" : "hidden"
        }`}
        onClick={() => {
          handleCollectionDrawer();
        }}
      ></div>

      <div
        className={`absolute border-black border-[2px] backdrop-brightness-50 bg-transpent w-[84vw] h-[67vh] px-10 py-2 pb-10 rounded   ${
          isCollectionDrawer ? "block" : "hidden "
        }`}
      >
        <div
          onClick={
            isBookDrawer || isAddBook || isEditBook
              ? () => {
                  setIsBookDrawer(false);
                  setIsAddBook(false);
                  setIsEditBook(false);
                }
              : () => {
                  handleCollectionDrawer();
                }
          }
          className="border-[1px] border-black hover:border-white bg-black text-white rounded w-[40px] h-[40px] right-[-10px] absolute hover:scale-125 top-[-10px] cursor-pointer transition duration-500 ease-in-out"
        >
          <FiArrowDownLeft className="w-[90%] h-[90%] mx-auto my-auto" />
        </div>
        {hideName ? (
          <FiEyeOff
            onClick={() => {
              setHideName(!hideName);
            }}
            className="text-white w-[20px] h-[20px] absolute right-1 bottom-1 hover:scale-110"
          />
        ) : (
          <FiEye
            onClick={() => {
              setHideName(!hideName);
            }}
            className="text-white w-[20px] h-[20px] absolute right-1 bottom-1 hover:scale-110"
          />
        )}

        <div id="header" className=" flex w-full h-10 pt-2 my-2">
          <BsBook className=" w-[40px] h-[40px] ml-3 text-white" />
          <label className=" ml-5 font-bold text-white text-[30px]">
            {collection.name}
          </label>
          {role === "admin" ? (
            <div className="flex">
              <BsWrench
                onClick={() => {
                  // handleUpdateCollection(collection._id);
                }}
                className="text-white mt-3 ml-10 w-[20px] h-[20px] hover:scale-110"
              />
              <BsFillTrash3Fill
                onClick={() => {
                  handleDeleteCollection(collection._id);
                  // handleCollectionDrawer();
                  window.location.reload();
                }}
                className="hover:text-red-600 mt-3 text-white w-[20px] h-[20px] ml-5 hover:scale-110 "
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        {isBookDrawer || isAddBook || isEditBook ? (
          <div>
            {isBookDrawer ? (
              <BookDrawer bookId={bookId} setIsOnload={setIsOnload} />
            ) : (
              <div>
                {isAddBook ? (
                  <AddBook CollectionId={collection._id} />
                ) : (
                  <EditBook bookId={bookId} />
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-[93%] pl-[3rem] py-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-950">
            <div className="flex gap-x-[40px] gap-y-[40px] flex-wrap ">
              {bookData?.map((item, index) => (
                <div key={item._id} id="collection" className="hover:z-30 ">
                  <div
                    id="item"
                    className={` relative min-w-[100px] w-[22vw] ${
                      hideName ? "rounded-l-[10px]" : "rounded-tl-[10px]"
                    } max-w-[120px] min-h-[130px] h-[40vh] max-h-[145px] bg-black hover:scale-125 cursor-pointer transition duration-500 ease-in-out hover:border-2 hover:border-white`}
                  >
                    {/* {console.log(item.buff)} */}
                    <img
                      onClick={() => {
                        handleBookDrawer(item._id);
                        // handleUpdate(item);
                        // console.log(bookId);
                      }}
                      src={item.buff}
                      className="w-full h-full rounded-l-[10px]"
                    />

                    <div
                      className={`w-[30px] h-[53px] absolute top-0 right-0 backdrop-blur-[0px] rounded-bl-[10px] bg-[rgba(0,0,0,0.4)]`}
                    >
                      {role === "admin" ? (
                        <div>
                          <BsWrench
                            onClick={() => {
                              handleEditBook(item._id);
                              // setIsEditBook(!isEditBook);
                            }}
                            className="text-white absolute right-2 top-2 hover:scale-110 backdrop-blur-10"
                          />
                          <BsFillTrash3Fill
                            onClick={() => {
                              handleDeleteBook(item._id);
                              // window.location.reload();
                            }}
                            className="hover:text-red-600 text-white absolute right-2 top-8 hover:scale-110 backdrop-blur-10"
                          />
                        </div>
                      ) : (
                        <div>
                          <div>
                            {favList.find((e) => e.book_id === item._id) ? (
                              <BsHeartFill
                                className="text-[#e263c7] absolute right-2 top-8 hover:scale-110 backdrop-blur-10"
                                onClick={() => {
                                  handleFavRemoveBook(item._id);
                                  handleCheck();
                                }}
                              />
                            ) : (
                              <BsHeart
                                className="text-white absolute right-2 top-8 hover:scale-110 backdrop-blur-10"
                                onClick={() => {
                                  handleFavBook(item._id);
                                  handleCheck();
                                }}
                              />
                            )}
                            {ownedList.find((e) => e.book_id === item._id) ? (
                              <BsBookmarkCheckFill
                                className="text-[#58dd8b] absolute right-2 top-2 hover:scale-110 "
                                onClick={() => {
                                  handleOwnedRemoveBook(item._id);
                                  handleCheck();
                                }}
                              />
                            ) : (
                              <BsBookmarkPlus
                                className="text-white absolute right-2 top-2 hover:scale-110 "
                                onClick={() => {
                                  handleOwnedBook(item._id);
                                  handleCheck();
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {hideName ? (
                      <></>
                    ) : (
                      <label className="bg-white w-full absolute bottom-[0px] text-[10px] px-1">
                        {item.name}
                      </label>
                    )}
                  </div>
                </div>
              ))}
              {role === "admin" ? (
                <div id="collection" className="hover:z-30 ">
                  <div
                    id="item"
                    className="relative text-center min-w-[100px] w-[22vw] max-w-[120px] min-h-[130px] h-[40vh] max-h-[145px] bg-transpent hover:scale-125 cursor-pointer rounded transition duration-500 ease-in-out hover:border-2 border-2 border-[rgba(0,0,0,0.3)] hover:border-white"
                  >
                    {/* {console.log(item.buff)} */}
                    <div
                      onClick={() => {
                        setIsAddBook(!isAddBook);
                        // handleUpdate(item);
                        // console.log(item);
                      }}
                      // src={item.buff}
                      className="absolute w-full h-full peer"
                    />
                    <BsFillPlusCircleFill className="text-[rgba(0,0,0,0.4)] peer-hover:text-[rgba(206,206,206,0.9)] flex mx-auto mt-[25px] min-w-[70px] w-[17vw] max-w-[85px] min-h-[70px] h-[17vw] max-h-[85px] transition duration-500 ease-in-out" />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionDrawer;
