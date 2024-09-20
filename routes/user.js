const express = require("express");
const { getUserById } = require("../controller/userController");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");

router.use(authenticate);

router.get("/:id", getUserById);

module.exports = router;
