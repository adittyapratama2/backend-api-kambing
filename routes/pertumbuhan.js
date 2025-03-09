const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPertumbuhan,
  getPertumbuhan,
  deletePertumbuhan,
  updatePertumbuhan,
  getPertumbuhanById,
} = require("../controller/pertumbuhanController");

router.use(authenticate);

router.post("/", createPertumbuhan);
router.get("/", getPertumbuhan);
router.get("/:id", getPertumbuhanById);
router.patch("/update/:id", updatePertumbuhan);
router.delete("/:id", deletePertumbuhan);

module.exports = router;
