import React, { useEffect, useState } from "react";
import {
  BsBookmarkCheckFill,
  BsFillHeartFill,
  BsFillHouseFill,
} from "react-icons/bs";
import CollectionDrawer from "./CollectionDrawer";
import CollectionDataAPI from "../../api/CollectionData";
import MyCollection from "./MyCollection";
import MyFavorites from "./MyFavorites";

const CollectionBooks = (props) => {
  const { isHome, handleHome, isMyCollection, isMyFavorites, setIsOnload } =
    props;
  // console.log(isHome, isMyCollection, isMyFavorites);
  const [collectionData, setCollectionData] = useState([]);
  const [isCollectionDrawer, setIsCollectionDrawer] = useState(false);
  const [collection, setCollection] = useState({
    _id: "",
    name: "",
    buff: "",
  });
  const [hideName, setHideName] = useState(false);

  const handleCollectionDrawer = () => {
    setIsCollectionDrawer(!isCollectionDrawer);
  };
  const onOpenDrawer = (id, name, buff) => {
    setIsCollectionDrawer(true);
    setCollection({ _id: id, name: name, buff: buff });
  };

  // console.log(isHome, isMyCollection, isMyFavorites);
  useEffect(() => {
    setIsOnload(true);
    async function fetchCollection() {
      const res = await CollectionDataAPI("");
      setCollectionData(res);
      setIsOnload(false);
    }
    fetchCollection();
  }, []);

  return (
    <div className="">
      <div
        className={`mx-auto my-auto bg-[rgba(0,0,0,0.3)] border-[1px] border-[rgba(255,255,255,0.3)] min-h-[200px] w-[90vw] h-[80vh] mt-[2vh] rounded-l-[20px]`}
      >
        <div id="header" className=" flex w-full h-10 py-2 my-2">
          {isMyFavorites ? (
            <BsFillHeartFill className="text-white w-6 h-6 ml-3" />
          ) : (
            <></>
          )}
          {isHome ? (
            <BsFillHouseFill className="text-white w-6 h-6 ml-3" />
          ) : (
            <></>
          )}
          {isMyCollection ? (
            <BsBookmarkCheckFill className="text-white w-6 h-6 ml-3" />
          ) : (
            <></>
          )}
          <label
            className={` text-white ml-3 text-[17px] font-bold ${
              !isHome ? "hidden" : "block"
            }`}
          >
            Home
          </label>
          <label
            className={` text-white ml-3 text-[17px] font-bold ${
              !isMyCollection ? "hidden" : "block"
            }`}
          >
            My collection
          </label>
          <label
            className={` text-white ml-3 text-[17px] font-bold ${
              !isMyFavorites ? "hidden" : "block"
            }`}
          >
            My favorites
          </label>
          {/* {isHome ? (
            <></>
          ) : (
            <div className="right-0 ml-10 cursor-pointer" onClick={handleHome}>
              X
            </div>
          )} */}
        </div>

        <div className=" h-[80%] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-black ">
          {isHome ? (
            <div className="flex flex-wrap justify-self-auto px-10 pb-5 gap-[1.5rem] gap-y-[3.5rem] pt-5">
              {collectionData?.map((item, index) => (
                <div key={index} name="collection" className=" rounded">
                  <div id="collection" className="">
                    <div
                      id="item"
                      className=" min-w-[100px] w-[120px] h-[150px] bg-black hover:scale-125 cursor-pointer rounded-t transition duration-500 ease-in-out"
                    >
                      <img
                        src={item?.buff}
                        className="peer hover:border-[rgba(255,255,255,0.8)] w-full h-full rounded-t border-t-[2px] border-r-[2px] border-l-[2px] border-[rgba(255,255,255,0.7)] transition duration-500 ease-in-out"
                        onClick={() =>
                          onOpenDrawer(item._id, item.name, item?.buff)
                        }
                      ></img>
                      <div className="peer-hover:border-[rgba(255,255,255,0.8)] border-b-[2px] border-t-[0px] border-r-[2px] border-l-[2px] border-[rgba(0,0,0,0.3)] px-1 max-h-[17px] bg-white min-w-[100px] w-[120px] text-[11px] transition duration-500 ease-in-out">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isCollectionDrawer ? (
                <CollectionDrawer
                  handleCollectionDrawer={handleCollectionDrawer}
                  isCollectionDrawer={isCollectionDrawer}
                  collection={collection}
                  hideName={hideName}
                  setHideName={setHideName}
                  setIsOnload={setIsOnload}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div>
              {isMyCollection ? (
                <MyCollection
                  handleHome={handleHome}
                  setIsOnload={setIsOnload}
                />
              ) : (
                <MyFavorites
                  handleHome={handleHome}
                  setIsOnload={setIsOnload}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionBooks;
