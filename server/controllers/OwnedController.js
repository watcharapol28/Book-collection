const Owned = require("../models/OwnedModel.js");
const Book = require("../models/BookModel.js");
// const mongoose = require("mongoose");

// module.exports.isOwned = async (req, res) => {
//   const User_ID = req.body.user_id;
//   const owned = await Owned.findOne({
//     user_id: User_ID,
//     book_id: req.params.id,
//   });
//   if (owned) {
//     res.status(200).json(true);
//   } else {
//     res.status(200).json(false);
//   }
// };

module.exports.createOwned = async (req, res) => {
  try {
    // console.log(req.body.user_id);
    const User_ID = req.body.user_id;
    await Owned.create({ user_id: User_ID, book_id: req.params.id });
    return res.status(201).json("created");
  } catch {
    return res.status(500).json({ message: "ERR" });
  }
};

module.exports.removeOwned = async (req, res) => {
  try {
    // console.log(req.params.id, req.body.user_id);
    // const user_id= req.body.user_id;
    await Owned.findOneAndDelete({
      book_id: req.params.id,
      user_id: req.body.user_id,
    });
    res.status(200).json("deleted");
  } catch {
    return res.status(500).json({ message: "ERR" });
  }
};

module.exports.getOwnedOfUser = async (req, res) => {
  const User_ID = req.params.id;
  const owned = await Owned.find(
    { user_id: User_ID },
    { book_id: 1, _id: 0 }
  ).lean();
  const ownedBookIds = owned.map((item) => item.book_id);
  const ownedBooks = await Book.find({ _id: { $in: ownedBookIds } })
    .sort("bookCollection")
    .sort("name");
  res.status(200).json(ownedBooks);
};

module.exports.getOwned = async (req, res) => {
  try {
    // console.log("Here");
    const User_ID = req.params.id;
    const owned = await Owned.find(
      { user_id: User_ID },
      { book_id: 1, _id: 0 }
    ).lean();
    return res.status(200).json(owned);
  } catch (error) {
    return res.status(500).json(error);
  }
};
