const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createIndukan,
  getIndukan,
  getIndukanById,
  deleteIndukan,
  updateIndukan,
} = require("../controller/indukGoatController");

router.use(authenticate);

router.post("/", createIndukan);
router.get("/", getIndukan);
router.get("/:id", getIndukanById);
router.put("/:id", updateIndukan);
router.delete("/:id", deleteIndukan);

module.exports = router;
