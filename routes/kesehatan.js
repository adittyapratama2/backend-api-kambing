const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createKesehatan,
  getKesehatan,
} = require("../controller/kesehatanController");

router.use(authenticate);

router.post("/", createKesehatan);
router.get("/", getKesehatan);

module.exports = router;
