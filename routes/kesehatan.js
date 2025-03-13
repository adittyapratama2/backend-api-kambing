const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createKesehatan,
  getKesehatan,
  deleteKesehatan,
} = require("../controller/kesehatanController");

router.use(authenticate);

router.post("/", createKesehatan);
router.get("/", getKesehatan);
router.delete("/:id", deleteKesehatan);

module.exports = router;
