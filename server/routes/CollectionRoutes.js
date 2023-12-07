const {
  createCollection,
  getAllCollection,
  getCollection,
  updateCollection,
  // addBookToCollection,
  // putBookFromCollection,
  uploadImage,
  deleteCollection,
} = require("../controllers/CollectionController");

const router = require("express").Router();

router.post("/", createCollection);
router.delete("/:id", deleteCollection);
router.get("/", getAllCollection);
router.get("/:id", getCollection);
router.patch("/:id", uploadImage, updateCollection);
// router.patch("/:id/add", addBookToCollection);
// router.patch("/:id/put", putBookFromCollection);

module.exports = router;
