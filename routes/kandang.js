const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createKandang,
  getKandang,
  getKandangById,
  updateKandang,
  deleteKandang,
} = require("../controller/kandangController");

router.use(authenticate);

router.post("/", createKandang);
router.get("/", getKandang);
router.get("/:id", getKandangById);
router.put("/:id", updateKandang);
router.delete("/:id", deleteKandang);

module.exports = router;
