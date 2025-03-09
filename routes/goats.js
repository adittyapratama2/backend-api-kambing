const express = require("express");
const router = express.Router();
const {
  createGoat,
  getGoats,
  getGoat,
  updateGoat,
  deleteGoat,
} = require("../controller/goatController");
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate);

router.post("/", createGoat);
router.get("/", getGoats);
router.get("/:id", getGoat);
router.patch("/:id", updateGoat);
router.delete("/:id", deleteGoat);

module.exports = router;
