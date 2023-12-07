import React, { useState, useEffect } from "react";
import getBookDataAPI from "../../api/ABookData";
// import BookDataAPI from "../../api/Bookdata";
// import BookDataAPI from "../../api/Bookdata";

const BookDrawer = (props) => {
  const { bookId, setIsOnload } = props;
  // console.log(bookId);
  const [form, setForm] = useState({
    name: "",
    description: "",
    bookCollection: "",
    buff: "",
    updatedAt: "",
  });
  const [updateAt, setUpdateAt] = useState("");

  useEffect(() => {
    setIsOnload(true);
    async function fetchBook() {
      const res = await getBookDataAPI(bookId);
      setForm(res);
      const dateObj = new Date(res.updatedAt);
      setUpdateAt(dateObj.toLocaleDateString("en-GB"));
      // setForm({ name: res.name });
      // setForm({ description: res.description });
      // setForm({ updateAt: res.updateAt });
      // setForm({ buff: res.buff });
      // console.log(form);
      setIsOnload(false);
    }
    fetchBook();
  }, []);
  return (
    <div className="flex overflow-auto flex-wrap gap-x-[100px] gap-y-[50px] p-[50px] justify-center h-[50vh] mt-10 border-0 border-black overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-950">
      <div className="relative h-[50vh] w-[24vw] min-h-[300px] min-w-[200px] max-h-[350px] max-w-[250px] border-2 border-black">
        <img src={form.buff} className="w-full h-full" />
      </div>
      <div className="flex flex-col  ">
        <label className="text-white text-[30px] font-bold border-black border-0 mx-auto">
          {form.name}
        </label>
        <label className="text-gray-400 text-[15px] border-black border-0 mx-auto">
          Last updated : {updateAt}
        </label>
        <label className="mt-[20px] max-w-[450px] min-w-[300px] text-white text-[18px] border-black border-0 h-[150px] mx-auto">
          Detail : {form.description}
        </label>
      </div>
    </div>
  );
};

export default BookDrawer;
