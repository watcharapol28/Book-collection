const {
  //   isFavorite,
  createFavorite,
  getFavorites,
  removeFavorite,
  getFavoritesOfUser,
} = require("../controllers/FavoritesController");

const router = require("express").Router();

// router.get("/:id", isFavorite);
router.post("/:id", createFavorite);
router.delete("/:id", removeFavorite);
router.get("/:id", getFavorites);
router.get("/all/:id", getFavoritesOfUser);

module.exports = router;
