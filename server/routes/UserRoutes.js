const {
  // addToLikedBooks,
  // getLikedBooks,
  // removeFromLikedBooks,
  // uploadImage,
  userRegister,
  userLogin,
  userLogout,
  userGetData,
  userUpdatePassword,
} = require("../controllers/UserController");

const router = require("express").Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout/:id", userLogout);
router.get("/:id", userGetData);
router.patch("/:id", userUpdatePassword);
// router.post("/fav/:id", addToLikedBooks);
// router.get("/liked/:email", getLikedBooks);
// router.put("/delete", removeFromLikedBooks);

module.exports = router;
