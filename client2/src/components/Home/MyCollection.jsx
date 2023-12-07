import React, { useEffect, useState } from "react";
import { getAcessToken } from "../../helper/getToken";
import getFavAPI from "../../api/getFavBook";
import getOwnedAPI from "../../api/getOwned";
import {
  BsBookmarkCheckFill,
  BsBookmarkPlus,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import createOwnedAPI from "../../api/addOwned";
import createFavAPI from "../../api/FavBook";
import removeFavAPI from "../../api/deleteFavBook";
import removeOwnedAPI from "../../api/deleteOwned";
import getAllOwnedAPI from "../../api/getAllOwned";
import { FiChevronsLeft } from "react-icons/fi";
//when use drawer must to close

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

const MyCollection = (props) => {
  const { handleHome, setIsOnload } = props;
  const [bookList, setBookList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [favList, setFavList] = useState([]);
  const [ownedList, setOwnedList] = useState([]);

  const token = getAcessToken();
  const UserID = token === "" ? "" : parseJwt(token).userId;

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
    const fetchData = async () => {
      try {
        const bookListResponse = await getAllOwnedAPI(UserID);
        // console.log(bookListResponse);
        const updatedBookList = bookListResponse.map((bookList, index) => ({
          ...bookList,
          id: index + 1,
        }));
        setBookList(updatedBookList);
        // setIsLoading(false);
        setIsOnload(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
    // }
    // rmOwnedBook();
  };

  return (
    <div className="w-full h-[93%] pr-5 pl-10 py-5 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-950  ">
      <div className="flex gap-x-[1.5rem] gap-y-[2.5rem] flex-wrap ">
        <div
          id="item"
          className="relative text-center min-w-[100px] w-[22vw] max-w-[120px] min-h-[130px] h-[40vh] max-h-[145px] bg-transpent hover:scale-125 cursor-pointer rounded transition duration-500 ease-in-out hover:border-2 border-2 border-[rgba(0,0,0,0.5)] hover:border-white"
        >
          <div
            onClick={() => {
              handleHome();
            }}
            className="absolute w-full h-full peer"
          />
          <FiChevronsLeft className="text-[rgba(0,0,0,0.5)] peer-hover:text-[#ffffff] flex mx-auto mt-[25px] min-w-[70px] w-[17vw] max-w-[85px] min-h-[70px] h-[17vw] max-h-[85px] transition duration-500 ease-in-out" />
        </div>
        {bookList.map((item, index) => (
          <div key={item._id} id="collection" className="hover:z-30 ">
            <div
              id="item"
              className="relative min-w-[100px] w-[22vw] max-w-[120px] min-h-[130px] h-[40vh] max-h-[145px] bg-black hover:scale-125 cursor-pointer rounded transition duration-500 ease-in-out hover:border-2 hover:border-white"
            >
              {/* {console.log(item.buff)} */}
              <img
                onClick={() => {
                  // handleBookDrawer(item._id);
                  // handleUpdate(item);
                  // console.log(bookId);
                }}
                src={item.buff}
                className="w-full h-full"
              />

              <div
                className={`w-[30px] h-[53px] absolute top-0 right-0 backdrop-blur-[0px] rounded-bl-[10px] bg-[rgba(0,0,0,0.4)]`}
              >
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
                        handleCheck();
                        handleFavBook(item._id);
                      }}
                    />
                  )}
                  {ownedList.find((e) => e.book_id === item._id) ? (
                    <BsBookmarkCheckFill
                      className="text-[#58dd8b] absolute right-2 top-2 hover:scale-110 "
                      onClick={() => {
                        handleCheck();
                        handleOwnedRemoveBook(item._id);
                      }}
                    />
                  ) : (
                    <BsBookmarkPlus
                      className="text-white absolute right-2 top-2 hover:scale-110 "
                      onClick={() => {
                        handleCheck();
                        handleOwnedBook(item._id);
                      }}
                    />
                  )}
                </div>
              </div>

              <label className="bg-white w-full absolute bottom-[0px] text-[10px] px-1">
                {item.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCollection;
