const {} = require("../controllers/FavoritesController");
const {
  createOwned,
  removeOwned,
  getOwned,
  getOwnedOfUser,
} = require("../controllers/OwnedController");

const router = require("express").Router();

// router.get("/:id", isFavorite);
router.post("/:id", createOwned);
router.delete("/:id", removeOwned);
router.get("/:id", getOwned);
router.get("/all/:id", getOwnedOfUser);

module.exports = router;
