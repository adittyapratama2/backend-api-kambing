const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const {
  createPakanKandang,
  getPakanKandang,
  deletePakan,
} = require("../controller/pakanController");

router.use(authenticate);

router.post("/", createPakanKandang);
router.get("/", getPakanKandang);
router.delete("/:id", deletePakan);

module.exports = router;
