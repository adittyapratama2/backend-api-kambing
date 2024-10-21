const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPertumbuhan,
  getPertumbuhan,
} = require("../controller/pertumbuhanController");

router.use(authenticate);

router.post("/", createPertumbuhan);
router.get("/", getPertumbuhan);

module.exports = router;
