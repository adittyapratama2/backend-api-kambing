const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPerkawinan,
  getPerkawinan,
  getPerkawinanById,
  updatePerkawinan,
  deletePerkawinan,
} = require("../controller/perkawinanController");

router.use(authenticate);

router.post("/", createPerkawinan);
router.get("/", getPerkawinan);
router.get("/:id", getPerkawinanById);
router.put("/:id", updatePerkawinan);
router.delete("/:id", deletePerkawinan);

module.exports = router;
