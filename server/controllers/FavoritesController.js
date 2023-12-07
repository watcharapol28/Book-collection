const Favorite = require("../models/FavoritesModel.js");
const Book = require("../models/BookModel.js");
// const mongoose = require("mongoose");

// module.exports.isFavorite = async (req, res) => {
//   const User_ID = req.body.user_id;
//   const fav = await Favorite.findOne({
//     user_id: User_ID,
//     book_id: req.params.id,
//   });
//   if (fav) {
//     res.status(200).json(true);
//   } else {
//     res.status(200).json(false);
//   }
// };

module.exports.createFavorite = async (req, res) => {
  try {
    // console.log(req.body.user_id);
    const User_ID = req.body.user_id;
    await Favorite.create({ user_id: User_ID, book_id: req.params.id });
    return res.status(201).json("created");
  } catch {
    return res.status(500).json({ message: "ERR" });
  }
};

module.exports.removeFavorite = async (req, res) => {
  try {
    // console.log(req.params.id, req.body.user_id);
    // const user_id= req.body.user_id;
    await Favorite.findOneAndDelete({
      book_id: req.params.id,
      user_id: req.body.user_id,
    });
    res.status(200).json("deleted");
  } catch {
    return res.status(500).json({ message: "ERR" });
  }
};

module.exports.getFavoritesOfUser = async (req, res) => {
  const User_ID = req.params.id;
  //   console.log(User_ID);
  const fav = await Favorite.find({ user_id: User_ID }, { book_id: 1, _id: 0 });
  const favBookIds = fav.map((item) => item.book_id);
  const favBooks = await Book.find({ _id: { $in: favBookIds } })
    .sort("bookCollection")
    .sort("name");
  res.status(200).json(favBooks);
};

module.exports.getFavorites = async (req, res) => {
  try {
    // console.log("Here");
    const User_ID = req.params.id;
    const fav = await Favorite.find(
      { user_id: User_ID },
      { book_id: 1, _id: 0 }
    ).lean();
    return res.status(200).json(fav);
  } catch (error) {
    return res.status(500).json(error);
  }
};
