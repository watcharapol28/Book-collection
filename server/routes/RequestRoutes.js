const {
  createRequest,
  getRequest,
  removeRequest,
} = require("../controllers/RequestController");

const router = require("express").Router();

router.post("/", createRequest);
router.get("/", getRequest);
router.delete("/:id", removeRequest);

module.exports = router;
