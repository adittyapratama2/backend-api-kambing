const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPemerahan,
  getPemerahan,
  deletePemerahan,
} = require("../controller/pemerahanController");

router.use(authenticate);

router.post("/", createPemerahan);
router.get("/", getPemerahan);
router.delete("/:id", deletePemerahan);

module.exports = router;
