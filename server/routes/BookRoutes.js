const {
  createBook,
  uploadImage,
  getBook,
  updateBook,
  deleteBook,
  getAllBook,
} = require("../controllers/BookController");

const router = require("express").Router();

router.post("/", createBook);
router.get("/book/:id", getAllBook);
router.get("/:id", getBook);
router.patch("/:id", uploadImage, updateBook);
router.delete("/:id", deleteBook);
// router.get("/buffer/:id", BufferBook);

module.exports = router;
