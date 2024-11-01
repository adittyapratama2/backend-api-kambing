const express = require("express");
const { getUserById, getUserAll } = require("../controller/userController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate);

router.get("/:id", getUserById);
router.get("/", getUserAll);

module.exports = router;
