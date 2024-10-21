const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPejantan,
  getPejantan,
  getPejantanById,
  updatePejantan,
  deletePejantan,
} = require("../controller/pejantanGoatController");

router.use(authenticate);

router.post("/", createPejantan);
router.get("/", getPejantan);
router.get("/:id", getPejantanById);
router.put("/:id", updatePejantan);
router.delete("/:id", deletePejantan);

module.exports = router;
